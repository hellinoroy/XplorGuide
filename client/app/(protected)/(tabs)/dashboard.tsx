import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect, useState, useContext, useCallback } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Pressable,
    Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../../utils/authContext";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

const ITEMS_PER_PAGE = 5;

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

const TableRecommendation = () => {
    // const { user_id, recommendations, scores } = dataSesudah;
    const authState = useContext(AuthContext);
    const [selectedValue, setSelectedValue] = useState("neumf");

    const [currentPageA, setCurrentPageA] = useState(1);
    const [totalPagesA, setTotalPagesA] = useState(1);

    const [dataSebelum, setDataSebelum] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageScore, setCurrentPageScore] = useState(1);

    const [recommendation, setRecommendation] = useState<any>([]);
    const [score, setScore] = useState<any>([]);
    const [distribution, setDistribution] = useState<any>([]);

    const totalPages = Math.ceil(dataSebelum.length / ITEMS_PER_PAGE);
    const totalPagesScore = Math.ceil(score.length / ITEMS_PER_PAGE);

    const paginate = (array: any[], page: number) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return array.slice(start, start + ITEMS_PER_PAGE);
    };

    const paginatedScores = paginate(dataSebelum, currentPage);
    const paginatedScoreRows = paginate(score, currentPageScore);

    const renderRow = (
        rowData: Record<string, number>,
        headers: string[],
        key: number
    ) => (
        <View style={styles.tableRow} key={key}>
            {headers.map((header) => (
                <Text key={header} style={styles.tableCell}>
                    {rowData[header]}
                </Text>
            ))}
        </View>
    );

    useFocusEffect(
        useCallback(() => {
            const fetchDataSebelum = async () => {
                try {
                    const response = await axios.get(
                        `http://192.168.1.8:4040/api/destination/data-sebelum`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authState.token}`,
                            },
                        }
                    );
                    // console.log(response.data);
                    setDataSebelum(response.data);
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error(
                            "Server error:",
                            error.response?.data.message
                        );
                    } else {
                        console.error("Unexpected error:", error);
                    }
                    setDataSebelum([]);
                }
            };
            const fetchRecommendation = async () => {
                try {
                    // console.log("hello123")
                    const response = await axios.get(
                        `http://192.168.1.8:4040/api/destination/recommendation/${selectedValue}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authState.token}`,
                            },
                        }
                    );

                    setRecommendation(response.data.recommendation);
                    setScore(response.data.scores);
                    setDistribution(response.data.distribution);
                    // setDataSebelum(response.data);
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
            fetchDataSebelum();
        }, [])
    );

    useEffect(() => {
        
        const fetchRecommendation = async () => {
            try {
                // console.log("hello123")
                const response = await axios.get(
                    `http://192.168.1.8:4040/api/destination/recommendation/${selectedValue}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authState.token}`,
                        },
                    }
                );

                setRecommendation(response.data.recommendation);
                setScore(response.data.scores);
                setDistribution(response.data.distribution);
                // setDataSebelum(response.data);
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
    }, [selectedValue]);
    // console.log(recommendation);
    return (
        <View style={styles.tablesContainer}>
            {/* Data Sebelum Diuji Table */}
            <View style={styles.tableSection}>
                <View style={styles.tableTitleContainer}>
                    <Text style={styles.tableTitle}>Data Sebelum Diuji</Text>
                    <Text style={styles.pageIndicator}>
                        Halaman {currentPage} dari {totalPages}
                    </Text>
                </View>

                <View style={styles.tableSection}>
                    <Text style={styles.pageIndicator}>
                        Implicit Rating = 1, jika Place Rating {">"}= 4
                    </Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        {[
                            "user_id",
                            "place_id",
                            "place_rating",
                            "implicit_label",
                        ].map((h) => (
                            <Text key={h} style={styles.tableHeaderCell}>
                                {h.replace("_", " ").toUpperCase()}
                            </Text>
                        ))}
                    </View>

                    {paginatedScores.map(
                        (
                            { user_id, place_id, place_rating, implicit_label },
                            index
                        ) =>
                            renderRow(
                                {
                                    user_id,
                                    place_id,
                                    place_rating,
                                    implicit_label,
                                },
                                [
                                    "user_id",
                                    "place_id",
                                    "place_rating",
                                    "implicit_label",
                                ],
                                index
                            )
                    )}
                </View>

                <View style={styles.pagination}>
                    <TouchableOpacity
                        style={[
                            styles.pageButton,
                            currentPage === 1 && styles.disabledButton,
                        ]}
                        onPress={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        <Feather name="chevron-left" size={16} color="#fff" />
                        <Text style={styles.pageButtonText}>Sebelumnya</Text>
                    </TouchableOpacity>

                    <View style={styles.pageInfo}>
                        <Text style={styles.pageInfoText}>
                            {currentPage} / {totalPages}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.pageButton,
                            currentPage === totalPages && styles.disabledButton,
                        ]}
                        onPress={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                    >
                        <Text style={styles.pageButtonText}>Selanjutnya</Text>
                        <Feather name="chevron-right" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ margin: 20 }}>
                <Text>Pilih Model:</Text>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue);
                    }}
                    style={{ height: 50, width: 200 }}
                >
                    <Picker.Item label="NeuMF" value="neumf" />
                    <Picker.Item label="NeuralCF" value="neuralcf" />
                    <Picker.Item label="Matrix Factorization" value="mf" />
                </Picker>
            </View>

            {/* Scores Table */}
            <View style={styles.tableSection}>
                <View style={styles.tableTitleContainer}>
                    <Text style={styles.tableTitle}>Data Setelah Diuji</Text>
                    <Text style={styles.pageIndicator}>
                        Halaman {currentPageScore} dari {totalPagesScore}
                    </Text>
                </View>
                <View style={styles.tableTitleContainer}>
                    <Text style={styles.pageIndicator}>
                        High Recommendation :{distribution.high}
                    </Text>
                </View>
                <View style={styles.tableTitleContainer}>
                    <Text style={styles.pageIndicator}>
                        Medium Recommendation :{distribution.medium}
                    </Text>
                </View>
                <View style={styles.tableTitleContainer}>
                    <Text style={styles.pageIndicator}>
                        Low Recommendation :{distribution.low}
                    </Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                        {["user_id", "place_id", "score"].map((h) => (
                            <Text key={h} style={styles.tableHeaderCell}>
                                {h.replace("_", " ").toUpperCase()}
                            </Text>
                        ))}
                    </View>

                    {paginatedScoreRows &&
                        paginatedScoreRows.map((item: any, index: number) =>
                            renderRow(
                                {
                                    user_id: 301,
                                    place_id: item.place_id + 1,
                                    score: item.score,
                                },
                                ["user_id", "place_id", "score"],
                                index
                            )
                        )}
                </View>
                {/* Pagination */}
                <View style={styles.pagination}>
                    <TouchableOpacity
                        style={[
                            styles.pageButton,
                            currentPageScore === 1 && styles.disabledButton,
                        ]}
                        onPress={() =>
                            setCurrentPageScore((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPageScore === 1}
                    >
                        <Feather name="chevron-left" size={16} color="#fff" />
                        <Text style={styles.pageButtonText}>Sebelumnya</Text>
                    </TouchableOpacity>

                    <View style={styles.pageInfo}>
                        <Text style={styles.pageInfoText}>
                            {currentPageScore} / {totalPagesScore}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.pageButton,
                            currentPageScore === totalPagesScore &&
                                styles.disabledButton,
                        ]}
                        onPress={() =>
                            setCurrentPageScore((p) =>
                                Math.min(p + 1, totalPagesScore)
                            )
                        }
                        disabled={currentPageScore === totalPagesScore}
                    >
                        <Text style={styles.pageButtonText}>Selanjutnya</Text>
                        <Feather name="chevron-right" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {recommendation.map((item: any, index: any) => (
                <SearchComponent key={index} item={item} />
            ))}
        </View>
    );
};

export default function DashboardPage() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#047857" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Dashboard Admin</Text>
                    <Text style={styles.headerSubtitle}>
                        Kelola destinasi wisata Indonesia
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
                        placeholder="Cari data dashboard..."
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
            </View>

            <ScrollView style={styles.dashboardContainer}>
                {/* Statistics Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <Feather name="map-pin" size={24} color="#10B981" />
                        </View>
                        <Text style={styles.statNumber}>150</Text>
                        <Text style={styles.statLabel}>Total Destinasi</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <Feather name="users" size={24} color="#3B82F6" />
                        </View>
                        <Text style={styles.statNumber}>2,543</Text>
                        <Text style={styles.statLabel}>Pengunjung</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <Feather name="bookmark" size={24} color="#EF4444" />
                        </View>
                        <Text style={styles.statNumber}>892</Text>
                        <Text style={styles.statLabel}>Bookmarked</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <Feather name="star" size={24} color="#F59E0B" />
                        </View>
                        <Text style={styles.statNumber}>4.8</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionButtonContent}>
                            <Feather
                                name="plus-circle"
                                size={20}
                                color="#10B981"
                            />
                            <Text style={styles.actionButtonText}>
                                Tambah Destinasi Baru
                            </Text>
                        </View>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionButtonContent}>
                            <Feather name="edit-3" size={20} color="#3B82F6" />
                            <Text style={styles.actionButtonText}>
                                Edit Informasi
                            </Text>
                        </View>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionButtonContent}>
                            <Feather
                                name="bar-chart-2"
                                size={20}
                                color="#8B5CF6"
                            />
                            <Text style={styles.actionButtonText}>
                                Lihat Analitik
                            </Text>
                        </View>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionButtonContent}>
                            <Feather
                                name="settings"
                                size={20}
                                color="#6B7280"
                            />
                            <Text style={styles.actionButtonText}>
                                Pengaturan
                            </Text>
                        </View>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <View style={styles.recentActivityContainer}>
                    <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>

                    <View style={styles.activityItem}>
                        <View style={styles.activityIcon}>
                            <Feather name="map-pin" size={16} color="#10B981" />
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityTitle}>
                                Destinasi baru ditambahkan
                            </Text>
                            <Text style={styles.activityTime}>
                                2 jam yang lalu
                            </Text>
                        </View>
                    </View>

                    <View style={styles.activityItem}>
                        <View style={styles.activityIcon}>
                            <Feather name="bookmark" size={16} color="#EF4444" />
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityTitle}>
                                50 bookmark baru hari ini
                            </Text>
                            <Text style={styles.activityTime}>
                                5 jam yang lalu
                            </Text>
                        </View>
                    </View>

                    <View style={styles.activityItem}>
                        <View style={styles.activityIcon}>
                            <Feather name="star" size={16} color="#F59E0B" />
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityTitle}>
                                Review baru diterima
                            </Text>
                            <Text style={styles.activityTime}>
                                1 hari yang lalu
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Data Tables Section */}
                <TableRecommendation />

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
    dashboardContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        color: "#111827",
    },
    statsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 32,
    },
    statCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        width: (screenWidth - 60) / 2,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: "center",
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
    },
    quickActionsContainer: {
        marginBottom: 32,
    },
    actionButton: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    actionButtonContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
        marginLeft: 12,
    },
    recentActivityContainer: {
        marginBottom: 32,
    },
    activityItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    activityIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 2,
    },
    activityTime: {
        fontSize: 12,
        color: "#6B7280",
    },
    // Table Styles
    tablesContainer: {
        marginTop: 24,
        marginBottom: 32,
    },
    tableSection: {
        marginBottom: 24,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 16,
    },
    tableTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    pageIndicator: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "500",
    },
    table: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: "#F9FAFB",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    tableHeaderCell: {
        flex: 1,
        padding: 16,
        fontSize: 12,
        fontWeight: "700",
        color: "#374151",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    tableCell: {
        flex: 1,
        padding: 16,
        fontSize: 14,
        color: "#111827",
        textAlign: "center",
        fontWeight: "500",
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        paddingHorizontal: 4,
    },
    pageButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#10B981",
        borderRadius: 8,
        shadowColor: "#10B981",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    disabledButton: {
        backgroundColor: "#D1D5DB",
        shadowOpacity: 0,
        elevation: 0,
    },
    pageButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
        marginHorizontal: 4,
    },
    pageInfo: {
        backgroundColor: "#F3F4F6",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    pageInfoText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
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
});
