from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import torch
import torch.nn as nn

# Define the NeuMF model
class NeuMF(nn.Module):
    def __init__(self, num_users, num_items, embedding_dim=32):
        super(NeuMF, self).__init__()
        self.gmf_user = nn.Embedding(num_users, embedding_dim)
        self.gmf_item = nn.Embedding(num_items, embedding_dim)
        self.mlp_user = nn.Embedding(num_users, embedding_dim)
        self.mlp_item = nn.Embedding(num_items, embedding_dim)
        self.linear_1 = nn.Linear(embedding_dim * 2, 64)
        self.relu_1 = nn.LeakyReLU()
        self.linear_2 = nn.Linear(64, 32)
        self.relu_2 = nn.LeakyReLU()
        self.linear_3 = nn.Linear(32, 16)
        self.output_layer = nn.Linear(embedding_dim + 16, 1)

    def forward(self, user_ids, item_ids):
        gmf_u = self.gmf_user(user_ids)
        gmf_i = self.gmf_item(item_ids)
        gmf_output = gmf_u * gmf_i
        mlp_u = self.mlp_user(user_ids)
        mlp_i = self.mlp_item(item_ids)
        mlp_input = torch.cat([mlp_u, mlp_i], dim=-1)
        x = self.linear_1(mlp_input)
        x = self.relu_1(x)
        x = self.linear_2(x)
        x = self.relu_2(x)
        mlp_output = self.linear_3(x)
        concat = torch.cat([gmf_output, mlp_output], dim=-1)
        logits = self.output_layer(concat)
        return logits

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = NeuMF(num_users=301, num_items=437).to(device)
model.load_state_dict(torch.load("./model.pth", map_location=device))
model.eval()

# FastAPI app
app = FastAPI(title="NeuMF Recommender API", version="1.0")

# Request/response schemas
class Rating(BaseModel):
    item_id: int
    rating: float

class RecommendationRequest(BaseModel):
    ratings: List[Rating]

class RecommendationResponse(BaseModel):
    user_id: int
    recommendations: List[int]

@app.post("/recommend", response_model=RecommendationResponse)
def recommend(request: RecommendationRequest):
    user_id = 300  # Hardcoded for new users
    interacted_places = [r.item_id for r in request.ratings if r.rating >= 4]
    all_place_ids = list(range(437))
    top_n = 5

    user_tensor = torch.tensor([user_id] * len(all_place_ids), dtype=torch.long).to(device)
    place_tensor = torch.tensor(all_place_ids, dtype=torch.long).to(device)

    with torch.no_grad():
        scores = model(user_tensor, place_tensor)
        scores = torch.sigmoid(scores).squeeze()

    mask = [pid not in interacted_places for pid in all_place_ids]
    filtered_scores = scores[mask]
    filtered_place_ids = [pid for pid in all_place_ids if pid not in interacted_places]

    if len(filtered_place_ids) == 0:
        return RecommendationResponse(user_id=user_id, recommendations=[])

    top_indices = torch.topk(filtered_scores, top_n).indices
    top_recommendations = [filtered_place_ids[i] for i in top_indices]

    return RecommendationResponse(user_id=user_id, recommendations=top_recommendations)
