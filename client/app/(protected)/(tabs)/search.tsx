import {
	ScrollView,
	View,
	Text,
	Pressable,
	TextInput,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	Image,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, AntDesign } from "@expo/vector-icons";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

// Mock AuthContext for demo
const AuthContext = {
	token: "mock-token",
};

// Mock SearchComponent
const SearchComponent = ({ item }: { item: any }) => (
	<Pressable style={styles.resultCard}>
		<Image
			source={{
				uri:
					item.image ||
					"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
			}}
			style={styles.resultImage}
		/>
		<View style={styles.resultContent}>
			<Text style={styles.resultTitle}>
				{item.name || item.title || "Beautiful Destination"}
			</Text>
			<View style={styles.resultLocation}>
				<Feather
					name="map-pin"
					size={14}
					color="#6B7280"
				/>
				<Text style={styles.locationText}>
					{item.location || "Aceh, Indonesia"}
				</Text>
			</View>
			<View style={styles.resultMeta}>
				<View style={styles.rating}>
					<Feather
						name="star"
						size={12}
						color="#FCD34D"
					/>
					<Text style={styles.ratingText}>
						{item.rating || "4.8"}
					</Text>
				</View>
				<Text style={styles.category}>
					{item.category || "Wisata Alam"}
				</Text>
			</View>
		</View>
		<Pressable style={styles.favoriteButton}>
			<AntDesign
				name="hearto"
				size={18}
				color="#9CA3AF"
			/>
		</Pressable>
	</Pressable>
);

export default function SearchScreen() {
	const [target, setTarget] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [recentSearches, setRecentSearches] = useState([
		"Pantai Lampuuk",
		"Museum Tsunami",
		"Masjid Raya",
		"Kuliner Aceh",
	]);
	const [selectedCategory, setSelectedCategory] = useState("Semua");
	const authState = useContext(AuthContext);

	const categories = [
		{ id: "Semua", label: "Semua", icon: "grid" },
		{ id: "Museum", label: "Museum", icon: "archive" },
		{ id: "Religi", label: "Religi", icon: "star" },
		{ id: "Wisata Alam", label: "Alam", icon: "sun" },
		{ id: "Kuliner", label: "Kuliner", icon: "coffee" },
	];

	const popularDestinations = [
		{ name: "Pantai Lampuuk", category: "Wisata Alam", searches: "1.2k" },
		{ name: "Museum Tsunami", category: "Museum", searches: "890" },
		{
			name: "Masjid Raya Baiturrahman",
			category: "Religi",
			searches: "756",
		},
		{ name: "Pantai Lhoknga", category: "Wisata Alam", searches: "654" },
	];

	const fetchListTempat = async () => {
		if (!target.trim()) return;

		setIsLoading(true);
		try {
			const response = await axios.get(
				`http://192.168.1.16:4040/api/destination/search?q=${encodeURIComponent(
					target
				)}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authState.token}`,
					},
				}
			);
			setResults(response.data);

			// Add to recent searches if not already there
			if (!recentSearches.includes(target)) {
				setRecentSearches(prev => [target, ...prev.slice(0, 3)]);
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error("Server error:", error.response?.data.message);
			} else {
				console.error("Unexpected error:", error);
			}
			setResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRecentSearch = (searchTerm: string) => {
		setTarget(searchTerm);
		// Auto search when selecting recent
		setTimeout(() => {
			fetchListTempat();
		}, 100);
	};

	const CategoryButton = ({ category }: { category: any }) => (
		<Pressable
			style={[
				styles.categoryButton,
				selectedCategory === category.id && styles.activeCategoryButton,
			]}
			onPress={() => setSelectedCategory(category.id)}>
			<Feather
				name={category.icon as any}
				size={16}
				color={selectedCategory === category.id ? "#fff" : "#6B7280"}
			/>
			<Text
				style={[
					styles.categoryText,
					selectedCategory === category.id &&
						styles.activeCategoryText,
				]}>
				{category.label}
			</Text>
		</Pressable>
	);

	const PopularDestinationItem = ({ item }: { item: any }) => (
		<Pressable
			style={styles.popularItem}
			onPress={() => handleRecentSearch(item.name)}>
			<View style={styles.popularIcon}>
				<Feather
					name="trending-up"
					size={16}
					color="#10B981"
				/>
			</View>
			<View style={styles.popularContent}>
				<Text style={styles.popularName}>{item.name}</Text>
				<Text style={styles.popularMeta}>
					{item.category} • {item.searches} pencarian
				</Text>
			</View>
			<Feather
				name="arrow-up-right"
				size={16}
				color="#9CA3AF"
			/>
		</Pressable>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header with Gradient */}
			<LinearGradient
				colors={["#047857", "#10B981"]}
				style={styles.header}>
				<Text style={styles.headerTitle}>Jelajahi Destinasi</Text>
				<Text style={styles.headerSubtitle}>
					Temukan tempat menakjubkan di Indonesia
				</Text>

				{/* Enhanced Search Bar */}
				<View style={styles.searchContainer}>
					<View style={styles.searchBar}>
						<Feather
							name="search"
							size={20}
							color="#10B981"
						/>
						<TextInput
							style={styles.searchInput}
							placeholder="Cari destinasi, tempat, aktivitas..."
							placeholderTextColor="#9CA3AF"
							value={target}
							onChangeText={setTarget}
							onSubmitEditing={fetchListTempat}
							returnKeyType="search"
						/>
						{target.length > 0 && (
							<Pressable onPress={() => setTarget("")}>
								<Feather
									name="x"
									size={18}
									color="#9CA3AF"
								/>
							</Pressable>
						)}
					</View>

					<Pressable
						style={[
							styles.searchButton,
							isLoading && styles.searchButtonLoading,
						]}
						onPress={fetchListTempat}
						disabled={isLoading || !target.trim()}>
						{isLoading ? (
							<ActivityIndicator
								size="small"
								color="#fff"
							/>
						) : (
							<Feather
								name="search"
								size={18}
								color="#fff"
							/>
						)}
					</Pressable>
				</View>

				{/* Categories */}
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.categoriesContainer}>
					{categories.map(category => (
						<CategoryButton
							key={category.id}
							category={category}
						/>
					))}
				</ScrollView>
			</LinearGradient>

			{/* Main Content */}
			<ScrollView
				style={styles.content}
				showsVerticalScrollIndicator={false}>
				{target.length === 0 && results.length === 0 ? (
					// Default state - Recent searches and popular destinations
					<>
						{/* Recent Searches */}
						{recentSearches.length > 0 && (
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>
									Pencarian Terkini
								</Text>
								<View style={styles.recentSearches}>
									{recentSearches.map((search, index) => (
										<Pressable
											key={index}
											style={styles.recentSearchItem}
											onPress={() =>
												handleRecentSearch(search)
											}>
											<Feather
												name="clock"
												size={14}
												color="#6B7280"
											/>
											<Text
												style={styles.recentSearchText}>
												{search}
											</Text>
										</Pressable>
									))}
								</View>
							</View>
						)}

						{/* Popular Destinations */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Destinasi Populer
							</Text>
							{popularDestinations.map((item, index) => (
								<PopularDestinationItem
									key={index}
									item={item}
								/>
							))}
						</View>

						{/* Quick Actions */}
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Jelajahi Berdasarkan
							</Text>
							<View style={styles.quickActions}>
								<Pressable style={styles.quickActionCard}>
									<LinearGradient
										colors={["#EF4444", "#DC2626"]}
										style={styles.quickActionGradient}>
										<Feather
											name="heart"
											size={24}
											color="#fff"
										/>
									</LinearGradient>
									<Text style={styles.quickActionText}>
										Favorit
									</Text>
								</Pressable>

								<Pressable style={styles.quickActionCard}>
									<LinearGradient
										colors={["#F59E0B", "#D97706"]}
										style={styles.quickActionGradient}>
										<Feather
											name="star"
											size={24}
											color="#fff"
										/>
									</LinearGradient>
									<Text style={styles.quickActionText}>
										Rating Tinggi
									</Text>
								</Pressable>

								<Pressable style={styles.quickActionCard}>
									<LinearGradient
										colors={["#8B5CF6", "#7C3AED"]}
										style={styles.quickActionGradient}>
										<Feather
											name="map-pin"
											size={24}
											color="#fff"
										/>
									</LinearGradient>
									<Text style={styles.quickActionText}>
										Terdekat
									</Text>
								</Pressable>
							</View>
						</View>
					</>
				) : (
					// Search results
					<View style={styles.resultsSection}>
						<View style={styles.resultsHeader}>
							<Text style={styles.resultsTitle}>
								{isLoading
									? "Mencari..."
									: `Hasil Pencarian "${target}"`}
							</Text>
							{!isLoading && results.length > 0 && (
								<Text style={styles.resultsCount}>
									{results.length} destinasi ditemukan
								</Text>
							)}
						</View>

						{isLoading ? (
							<View style={styles.loadingContainer}>
								<ActivityIndicator
									size="large"
									color="#10B981"
								/>
								<Text style={styles.loadingText}>
									Mencari destinasi...
								</Text>
							</View>
						) : results.length === 0 ? (
							<View style={styles.emptyState}>
								<Feather
									name="search"
									size={48}
									color="#D1D5DB"
								/>
								<Text style={styles.emptyStateTitle}>
									Tidak ada hasil ditemukan
								</Text>
								<Text style={styles.emptyStateSubtitle}>
									Coba gunakan kata kunci yang berbeda atau
									jelajahi kategori lain
								</Text>
								<Pressable style={styles.exploreButton}>
									<Text style={styles.exploreButtonText}>
										Jelajahi Semua Destinasi
									</Text>
								</Pressable>
							</View>
						) : (
							results.map((item, index) => (
								<SearchComponent
									key={index}
									item={item}
								/>
							))
						)}
					</View>
				)}

				<View style={{ height: 40 }} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
	},
	header: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 8,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "700",
		color: "#fff",
		marginBottom: 4,
		marginTop: 10,
	},
	headerSubtitle: {
		fontSize: 16,
		color: "rgba(255, 255, 255, 0.8)",
		marginBottom: 20,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	searchBar: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 12,
		marginRight: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: "#111827",
		marginLeft: 12,
	},
	searchButton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		alignItems: "center",
		justifyContent: "center",
	},
	searchButtonLoading: {
		opacity: 0.7,
	},
	categoriesContainer: {
		flexDirection: "row",
	},
	categoryButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 20,
		marginRight: 8,
	},
	activeCategoryButton: {
		backgroundColor: "#fff",
	},
	categoryText: {
		fontSize: 14,
		fontWeight: "600",
		color: "rgba(255, 255, 255, 0.8)",
		marginLeft: 6,
	},
	activeCategoryText: {
		color: "#047857",
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	section: {
		marginTop: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 16,
	},
	recentSearches: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	recentSearchItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	recentSearchText: {
		fontSize: 14,
		color: "#374151",
		marginLeft: 6,
		fontWeight: "500",
	},
	popularItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	popularIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#F0FDF4",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	popularContent: {
		flex: 1,
	},
	popularName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 2,
	},
	popularMeta: {
		fontSize: 14,
		color: "#6B7280",
	},
	quickActions: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	quickActionCard: {
		alignItems: "center",
		flex: 1,
		marginHorizontal: 4,
	},
	quickActionGradient: {
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
	},
	quickActionText: {
		fontSize: 12,
		fontWeight: "600",
		color: "#374151",
		textAlign: "center",
	},
	resultsSection: {
		marginTop: 20,
	},
	resultsHeader: {
		marginBottom: 16,
	},
	resultsTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 4,
	},
	resultsCount: {
		fontSize: 14,
		color: "#6B7280",
	},
	loadingContainer: {
		alignItems: "center",
		paddingVertical: 40,
	},
	loadingText: {
		fontSize: 16,
		color: "#6B7280",
		marginTop: 12,
	},
	emptyState: {
		alignItems: "center",
		paddingVertical: 40,
	},
	emptyStateTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#374151",
		marginTop: 16,
		marginBottom: 8,
	},
	emptyStateSubtitle: {
		fontSize: 14,
		color: "#6B7280",
		textAlign: "center",
		marginBottom: 20,
		lineHeight: 20,
	},
	exploreButton: {
		backgroundColor: "#047857",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 24,
	},
	exploreButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 14,
	},
	resultCard: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 12,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	resultImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
		marginRight: 12,
	},
	resultContent: {
		flex: 1,
		justifyContent: "space-between",
	},
	resultTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 4,
	},
	resultLocation: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	locationText: {
		fontSize: 14,
		color: "#6B7280",
		marginLeft: 4,
	},
	resultMeta: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		fontSize: 12,
		color: "#374151",
		marginLeft: 4,
		fontWeight: "500",
	},
	category: {
		fontSize: 12,
		color: "#10B981",
		backgroundColor: "#F0FDF4",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 12,
		overflow: "hidden",
	},
	favoriteButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#F9FAFB",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
	},
});
