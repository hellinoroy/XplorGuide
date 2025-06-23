import {
    ScrollView,
    View,
    Text,
    Pressable,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../../utils/authContext";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

// Mock AuthContext for demo
// const AuthContext = {
//     token: "mock-token",
//     logOut: () => console.log("Logout"),
// };

// Mock SearchComponent
const SearchComponent = ({ item }: { item: any }) => {
    const router = useRouter();

    return (
        <Pressable
            style={styles.bookmarkCard}
            onPress={() => router.push(`/search/${item.tempat_id}`)}
        >
            <Image
                source={{
                    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
                }}
                style={styles.bookmarkImage}
            />
            <View style={styles.bookmarkInfo}>
                <Text style={styles.bookmarkTitle}>
                    {item.tempat_id} | {item.tempat_nama || "Beautiful Place"}
                </Text>
                <Text style={styles.bookmarkLocation}>
                    <Feather name="map-pin" size={12} color="#6B7280" />{" "}
                    {item.tempat_kota || "Aceh, Indonesia"}
                </Text>
                <View style={styles.bookmarkRating}>
                    <Text style={styles.ratingText}>
                        {item.tempat_kategori}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default function Profile() {
    const authState = useContext(AuthContext);
    const [bookmark, setBookmark] = useState<any>([]);
    const [me, setMe] = useState<any>({
        user_username: "Febrio Dwi Setiawan",
        email: "febrio@xploreguide.com",
        joinDate: "Januari 2023",
        totalTrips: 24,
        totalReviews: 18,
    });

    useFocusEffect(
        useCallback(() => {
            const fetchMe = async () => {
                try {
                    const response = await axios.get(
                        `http://192.168.1.8:4040/api/auth/me`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authState.token}`,
                            },
                        }
                    );
                    // console.log(response.data.data.Bookmarks);

                    const data = response.data.data
                    setMe((prev: any) => ({
                        ...prev,
                        user_username: data.user_username,
                        email: data.user_email
                    }));

                    setBookmark(response.data.data.Bookmarks);
                  
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error(
                            "Server error:",
                            error.response?.data.message
                        );
                    } else {
                        console.error("Unexpected error:", error);
                    }
                }
            };

            fetchMe();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Gradient */}
            <LinearGradient
                colors={["#047857", "#10B981"]}
                style={styles.header}
            >
                {/* Profile Avatar and Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                            }}
                            style={styles.avatar}
                        />
                        <Pressable style={styles.editAvatarButton}>
                            <Feather name="camera" size={16} color="#fff" />
                        </Pressable>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.username}>{me.user_username}</Text>
                        <Text style={styles.email}>{me.email}</Text>
                        <Text style={styles.joinDate}>
                            Bergabung sejak {me.joinDate}
                        </Text>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>
                                {bookmark.length}
                            </Text>
                            <Text style={styles.statLabel}>Boookmark</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>
                                {me.totalTrips}
                            </Text>
                            <Text style={styles.statLabel}>Perjalanan</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>
                                {me.totalReviews}
                            </Text>
                            <Text style={styles.statLabel}>Ulasan</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <Pressable style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Feather name="edit-3" size={20} color="#047857" />
                        </View>
                        <Text style={styles.actionText}>Edit Profil</Text>
                    </Pressable>

                    <Pressable style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Feather
                                name="settings"
                                size={20}
                                color="#6B7280"
                            />
                        </View>
                        <Text style={styles.actionText}>Pengaturan</Text>
                    </Pressable>

                    <Pressable style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Feather name="share-2" size={20} color="#3B82F6" />
                        </View>
                        <Text style={styles.actionText}>Bagikan</Text>
                    </Pressable>

                    {/* Logout Button */}
                    <Pressable
                        onPress={() => authState.logOut()}
                        style={styles.actionButton}
                    >
                        <View style={styles.actionIcon}>
                            <Feather name="log-out" size={20} color="#EF4444" />
                        </View>

                        <Text style={styles.actionText}>Log Out</Text>
                    </Pressable>
                </View>

                {/* Bookmarks Section */}
                <View style={styles.bookmarksSection}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleContainer}>
                            <Feather name="bookmark" size={20} color="#EF4444" />
                            <Text style={styles.sectionTitle}>
                                Bookmarked
                            </Text>
                        </View>
                        <Text style={styles.sectionCount}>
                            {bookmark.length} tempat
                        </Text>
                    </View>

                    <ScrollView
                        style={styles.bookmarksList}
                        showsVerticalScrollIndicator={false}
                    >
                        {bookmark.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Feather
                                    name="bookmark"
                                    size={48}
                                    color="#D1D5DB"
                                />
                                <Text style={styles.emptyStateTitle}>
                                    Belum ada tempat bookmark
                                </Text>
                                <Text style={styles.emptyStateSubtitle}>
                                    Mulai jelajahi dan simpan tempat-tempat
                                    menarik
                                </Text>
                                <Pressable style={styles.exploreButton}>
                                    <Text style={styles.exploreButtonText}>
                                        Jelajahi Sekarang
                                    </Text>
                                </Pressable>
                            </View>
                        ) : (
                            bookmark.map((item: any, index: any) => (
                                <SearchComponent
                                    key={index}
                                    item={item.Tempat}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>

                {/* Additional Menu Items */}
                {/* <View style={styles.menuSection}>
                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Feather name="clock" size={20} color="#8B5CF6" />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Riwayat Perjalanan
                            </Text>
                            <Text style={styles.menuSubtitle}>
                                Lihat tempat yang pernah dikunjungi
                            </Text>
                        </View>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#9CA3AF"
                        />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Feather name="star" size={20} color="#F59E0B" />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Ulasan Saya</Text>
                            <Text style={styles.menuSubtitle}>
                                Kelola ulasan dan rating
                            </Text>
                        </View>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#9CA3AF"
                        />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Feather
                                name="help-circle"
                                size={20}
                                color="#06B6D4"
                            />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>
                                Bantuan & Dukungan
                            </Text>
                            <Text style={styles.menuSubtitle}>
                                FAQ dan hubungi kami
                            </Text>
                        </View>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#9CA3AF"
                        />
                    </Pressable>
                </View> */}

                <View style={{ height: 40 }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        paddingBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    profileSection: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "#fff",
    },
    editAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#047857",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#fff",
    },
    profileInfo: {
        alignItems: "center",
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: 8,
    },
    joinDate: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.7)",
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        width: "100%",
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: "500",
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        marginHorizontal: 12,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    quickActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    actionButton: {
        alignItems: "center",
        flex: 1,
        marginHorizontal: 4,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actionText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
        textAlign: "center",
    },
    bookmarksSection: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginLeft: 8,
    },
    sectionCount: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "500",
    },
    bookmarksList: {
        maxHeight: 300,
    },
    bookmarkCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    bookmarkImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    bookmarkInfo: {
        flex: 1,
        justifyContent: "space-between",
    },
    bookmarkTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 4,
    },
    bookmarkLocation: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 4,
    },
    bookmarkRating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 12,
        color: "#374151",
        marginLeft: 4,
        fontWeight: "500",
    },
    bookmarkAction: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#FEF2F2",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
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
    menuSection: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F9FAFB",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
        color: "#6B7280",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EF4444",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#EF4444",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 8,
    },
});
