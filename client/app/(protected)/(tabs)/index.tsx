import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Dimensions,
	Image,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function IndexPage() {
	const [savedPlaces, setSavedPlaces] = useState<number[]>([]);

	const places = [
		{
			id: 1,
			name: "Museum Kota Lhokseumawe",
			location: "Kota Lhokseumawe, Aceh",
			rating: 5,
			image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=250&fit=crop",
			description:
				"Museum bersejarah yang menampilkan warisan budaya Lhokseumawe",
			category: "Museum",
		},
		{
			id: 2,
			name: "Masjid Raya Baiturrahman",
			location: "Kota Banda Aceh, Aceh",
			rating: 5,
			image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=250&fit=crop",
			description:
				"Masjid bersejarah yang menjadi simbol spiritual Banda Aceh",
			category: "Religi",
		},
		{
			id: 3,
			name: "Pantai Lampuuk",
			location: "Banda Aceh, Aceh",
			rating: 4,
			image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
			description:
				"Pantai indah dengan ombak yang cocok untuk berselancar",
			category: "Wisata Alam",
		},
	];

	const toggleSave = (placeId: number) => {
		setSavedPlaces(prev =>
			prev.includes(placeId)
				? prev.filter(id => id !== placeId)
				: [...prev, placeId]
		);
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Feather
				key={i}
				name="star"
				size={16}
				color={i < rating ? "#FCD34D" : "#E5E7EB"}
				style={{ marginRight: 2 }}
			/>
		));
	};

	const PlaceCard = ({ place }: { place: any }) => (
		<View style={styles.placeCard}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: place.image }}
					style={styles.placeImage}
				/>
				<TouchableOpacity
					style={styles.saveButton}
					onPress={() => toggleSave(place.id)}>
					<AntDesign
						name={
							savedPlaces.includes(place.id) ? "heart" : "hearto"
						}
						size={18}
						color={
							savedPlaces.includes(place.id)
								? "#EF4444"
								: "#9CA3AF"
						}
					/>
				</TouchableOpacity>
				<View style={styles.categoryTag}>
					<Text style={styles.categoryTagText}>{place.category}</Text>
				</View>
			</View>

			<View style={styles.placeInfo}>
				<Text style={styles.placeName}>{place.name}</Text>
				<View style={styles.locationRow}>
					<Feather
						name="map-pin"
						size={12}
						color="#9CA3AF"
					/>
					<Text style={styles.locationText}>{place.location}</Text>
				</View>
				<View style={styles.ratingRow}>
					<View style={styles.starsContainer}>
						{renderStars(place.rating)}
					</View>
					<Text style={styles.ratingText}>{place.rating}</Text>
				</View>
				<Text style={styles.description}>{place.description}</Text>
				<TouchableOpacity style={styles.detailButton}>
					<Text style={styles.detailButtonText}>Lihat Detail</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="#047857"
			/>

			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<Text style={styles.headerTitle}>Xplore Guide</Text>
					<Text style={styles.headerSubtitle}>
						Jelajahi keindahan Tanah Indonesia
					</Text>
				</View>
			</View>

			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<View style={styles.searchBar}>
					<Feather
						name="search"
						size={16}
						color="#9CA3AF"
						style={{ marginRight: 8 }}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder="Cari destinasi wisata..."
						placeholderTextColor="#9CA3AF"
					/>
				</View>
			</View>

			{/* Places List */}
			<ScrollView style={styles.placesContainer}>
				<Text style={styles.sectionTitle}>Destinasi Populer</Text>
				{places.map(place => (
					<PlaceCard
						key={place.id}
						place={place}
					/>
				))}
				<View style={{ height: 20 }} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		backgroundColor: "#047857",
		paddingHorizontal: 20,
		paddingVertical: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
	headerContent: {},
	headerTitle: {
		fontSize: 28,
		fontWeight: "700",
		color: "#fff",
		marginBottom: 4,
	},
	headerSubtitle: {
		fontSize: 16,
		color: "#A7F3D0",
		opacity: 0.9,
	},
	searchContainer: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "#F9FAFB",
	},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: "#111827",
	},
	placesContainer: {
		flex: 1,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 20,
		color: "#111827",
	},
	placeCard: {
		backgroundColor: "#fff",
		borderRadius: 16,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 6,
		overflow: "hidden",
	},
	imageContainer: {
		position: "relative",
		overflow: "hidden",
	},
	placeImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	saveButton: {
		position: "absolute",
		top: 16,
		right: 16,
		backgroundColor: "rgba(255, 255, 255, 0.95)",
		padding: 8,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	categoryTag: {
		position: "absolute",
		top: 16,
		left: 16,
		backgroundColor: "#10B981",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		shadowColor: "#10B981",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 3,
	},
	categoryTagText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "600",
	},
	placeInfo: {
		padding: 20,
	},
	placeName: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 6,
		color: "#111827",
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	locationText: {
		marginLeft: 6,
		color: "#6B7280",
		fontSize: 14,
		fontWeight: "500",
	},
	ratingRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	starsContainer: {
		flexDirection: "row",
		marginRight: 8,
	},
	ratingText: {
		marginLeft: 4,
		color: "#374151",
		fontSize: 14,
		fontWeight: "600",
	},
	description: {
		color: "#6B7280",
		marginBottom: 16,
		fontSize: 14,
		lineHeight: 20,
	},
	detailButton: {
		backgroundColor: "#10B981",
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: "center",
		shadowColor: "#10B981",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3,
	},
	detailButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
