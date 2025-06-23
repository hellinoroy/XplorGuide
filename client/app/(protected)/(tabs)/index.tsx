import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState, useCallback, useContext } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import axios from "axios";
import { AuthContext } from "../../../utils/authContext";

const { width: screenWidth } = Dimensions.get("window");

export default function IndexPage() {
    const authState = useContext(AuthContext);
    const router = useRouter();
    const [places, setPlaces] = useState<any>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchRecommendation = async () => {
                try {
                    // console.log("hello123")
                    const response = await axios.get(
                        `http://192.168.1.8:4040/api/destination/recommendation/neumf`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authState.token}`,
                            },
                        }
                    );
                    console.log(response.data.recommendation);
                    // setDataSebelum(response.data);
                    setPlaces(response.data.recommendation);
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error(
                            "Server error:",
                            error.response?.data.message
                        );
                    } else {
                        console.error("Unexpected error:", error);
                    }
                    // setDataSebelum([]);
                }
            };

            fetchRecommendation();
        }, [])
    );

    const PlaceCard = ({ place }: { place: any }) => (
        <View style={styles.placeCard}>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
                    }}
                    style={styles.placeImage}
                />

                <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>
                        {place.tempat_kategori}
                    </Text>
                </View>
            </View>

            <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.tempat_nama}</Text>
                <View style={styles.locationRow}>
                    <Feather name="map-pin" size={12} color="#9CA3AF" />
                    <Text style={styles.locationText}>{place.tempat_kota}</Text>
                </View>
                <TouchableOpacity style={styles.detailButton} onPress={() => router.push(`/search/${place.tempat_id}`)}>
                    <Text style={styles.detailButtonText}>Lihat Detail</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#047857" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Xplore Guide</Text>
                    <Text style={styles.headerSubtitle}>
                        Jelajahi keindahan Tanah Indonesia
                    </Text>
                </View>
            </View>

            {/* Places List */}
            <ScrollView style={styles.placesContainer}>
                <Text style={styles.sectionTitle}>Destinasi Populer</Text>
                {places.map((place: any) => (
                    <PlaceCard key={place.tempat_id} place={place} />
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
