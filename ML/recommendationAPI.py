from fastapi import FastAPI, HTTPException
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

class MatrixFactorization(nn.Module):
    def __init__(self, num_users, num_items, embedding_dim=64):
        super(MatrixFactorization, self).__init__()
        self.user_embedding = nn.Embedding(num_users, embedding_dim)
        self.item_embedding = nn.Embedding(num_items, embedding_dim)

        # Optional: Initialize embeddings
        nn.init.normal_(self.user_embedding.weight, std=0.01)
        nn.init.normal_(self.item_embedding.weight, std=0.01)

    def forward(self, user_ids, item_ids):
        user_vecs = self.user_embedding(user_ids)  # shape: (batch_size, embedding_dim)
        item_vecs = self.item_embedding(item_ids)  # shape: (batch_size, embedding_dim)

        # Dot product of user and item embeddings
        scores = (user_vecs * item_vecs).sum(dim=1, keepdim=True)  # shape: (batch_size, 1)
        return scores

class NeuralCF(nn.Module):
    def __init__(self, num_users, num_items, embedding_dim=32):
        super().__init__()
        self.user_embedding = nn.Embedding(num_users, embedding_dim)
        self.item_embedding = nn.Embedding(num_items, embedding_dim)

        # MLP layers (simple 2-layer example)
        self.fc1 = nn.Linear(embedding_dim * 2, 64)
        self.relu1 = nn.ReLU()
        self.fc2 = nn.Linear(64, 32)
        self.relu2 = nn.ReLU()
        self.output = nn.Linear(32, 1)  # output raw logits for BCEWithLogitsLoss

    def forward(self, user_ids, item_ids):
        user_vec = self.user_embedding(user_ids)
        item_vec = self.item_embedding(item_ids)
        x = torch.cat([user_vec, item_vec], dim=-1)  # concat user and item embeddings
        x = self.relu1(self.fc1(x))
        x = self.relu2(self.fc2(x))
        logits = self.output(x)
        return logits  # raw score, use sigmoid or BCEWithLogitsLoss
    
# Load device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Instantiate all models
models = {
    "neumf": NeuMF(num_users=301, num_items=437).to(device),
    "neuralcf": NeuralCF(num_users=301, num_items=437).to(device),
    "mf": MatrixFactorization(num_users=301, num_items=437).to(device)
}

model_paths = {
    "neumf": "./neumfModel.pth",
    "neuralcf": "./neucfModel.pth",
    "mf": "./matrixFactorizationModel.pth"
}

for name, model in models.items():
    path = model_paths.get(name)
    if path:
        model.load_state_dict(torch.load(path, map_location=device))
        model.eval()

# FastAPI setup
app = FastAPI()

class Rating(BaseModel):
    item_id: int
    rating: float

class RecommendationRequest(BaseModel):
    ratings: List[Rating]

class ScoredPlace(BaseModel):
    place_id: int
    score: float

class RecommendationResponse(BaseModel):
    user_id: int
    recommendations: List[int]
    scores: List[ScoredPlace]

@app.post("/recommendation/{model_name}", response_model=RecommendationResponse)
def recommend(model_name: str, request: RecommendationRequest):
    # Get model
    model = models.get(model_name.lower())
    if model is None:
        raise HTTPException(status_code=404, detail=f"Model '{model_name}' not found.")

    user_id = 300  # Hardcoded for demo
    interacted_places = [r.item_id for r in request.ratings if r.rating >= 4]
    all_place_ids = list(range(437))
    top_n = 10

    user_tensor = torch.tensor([user_id] * len(all_place_ids), dtype=torch.long).to(device)
    place_tensor = torch.tensor(all_place_ids, dtype=torch.long).to(device)

    with torch.no_grad():
        logits = model(user_tensor, place_tensor)
        scores = torch.sigmoid(logits).squeeze()

    mask = [pid not in interacted_places for pid in all_place_ids]
    filtered_scores = scores[mask]
    filtered_place_ids = [pid for pid in all_place_ids if pid not in interacted_places]

    if len(filtered_place_ids) == 0:
        return RecommendationResponse(user_id=user_id, recommendations=[], scores=[])

    scored_places = [
        {"place_id": pid, "score": float(score)}
        for pid, score in zip(filtered_place_ids, filtered_scores)
    ]

    top_indices = torch.topk(filtered_scores, top_n).indices
    top_recommendations = [filtered_place_ids[i] for i in top_indices]

    return RecommendationResponse(
        user_id=user_id,
        recommendations=top_recommendations,
        scores=scored_places
    )