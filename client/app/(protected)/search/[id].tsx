import {
    ScrollView,
    View,
    Image,
    Text,
    Pressable,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../utils/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faMagnifyingGlass,
    faHeart,
    faComment,
    faStar as solidStar,
    faBookmark as solidBookmark,
    faTicket,
    faCity,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
    faStar as hollowStar,
    faBookmark as hollowBookmark,
} from "@fortawesome/free-regular-svg-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

type UserFormat = {
    user_username: string;
};
type CommentFormat = {
    id: string;
    User: UserFormat;
    comment_comment: string;
    user_id: string;
};

type Format = {
    Comments: CommentFormat[];
    tempat_id: string;
    tempat_foto: string;
    tempat_nama: string;
    tempat_kategori: string;
    tempat_kota: string;
    tempat_deskripsi: string;
    tempat_rating: string;
};

export default function ViewScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [userId, setUserId] = useState<string>("");

    const [results, setResults] = useState<Format | null>(null);
    const authState = useContext(AuthContext);

    const [rating, setRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);

    const [bookmark, setBookmark] = useState(false);
    const [hasBookmarked, setHasBookmarked] = useState(false);

    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchTempat = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.1.8:4040/api/destination/${encodeURIComponent(
                        id
                    )}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authState.token}`,
                        },
                    }
                );
                // console.log(response.data);
                console.log(response.data.Comments);
                setResults(response.data);
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

        const fetchUserInteraction = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.1.8:4040/api/user/attribute/${encodeURIComponent(
                        id
                    )}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authState.token}`,
                        },
                    }
                );

                setRating(response.data.data.rating);
                setBookmark(response.data.data.bookmark);
                // console.log(response.data);
                // setResults(response.data);
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
                const data = response.data.data;
                // console.log(data.user_id)
                // console.log(data.User)
                setUserId(data.user_id);
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

        fetchTempat();
        fetchUserInteraction();
    }, []);

    useEffect(() => {
        // console.log(rating)
        const putRating = async () => {
            try {
                const payload = { rating: rating };
                // console.log(payload);
                const response = await axios.put(
                    `http://192.168.1.8:4040/api/user/rating/${encodeURIComponent(
                        id
                    )}`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authState.token}`,
                        },
                    }
                );
                // console.log(response.data);
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
        if (hasRated) {
            // console.log(rating)
            putRating();
        }
    }, [rating]);

    useEffect(() => {
        const putBookmark = async () => {
            try {
                const response = await axios.put(
                    `http://192.168.1.8:4040/api/user/bookmark/${encodeURIComponent(
                        id
                    )}`,
                    {}, // empty body
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authState.token}`,
                        },
                    }
                );
                console.log(response.data);
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

        if (hasBookmarked) {
            putBookmark();
        }
    }, [bookmark]);

    const onSubmit = async () => {
        try {
            // console.log(comment)
            const payload = { comment: comment };
            const response = await axios.post(
                `http://192.168.1.8:4040/api/user/comment/${encodeURIComponent(
                    id
                )}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState.token}`,
                    },
                }
            );
            // console.log(response);
            router.replace(`/search/${id}`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Server error:", error.response?.data.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const onDelete = async (comment_id: any, user_id: any) => {
        try {
            const response = await axios.delete(
                `http://192.168.1.8:4040/api/user/comment/${id}/${comment_id}/${user_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState.token}`,
                    },
                }
            );
            // console.log(response);
            router.replace(`/search/${id}`);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Server error:", error.response?.data.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <SafeAreaView className="bg-white flex-1 flex-col">
            <View style={styles.header}>
                <Pressable onPress={handleGoBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Pressable>
            </View>

            {results && (
                <ScrollView className="flex flex-col">
                    <View style={styles.imageContainer}></View>
                    <Image
                        className="self-center m-5"
                        source={
                            results.tempat_foto?.trim()
                                ? { uri: results.tempat_foto }
                                : {
                                      uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
                                  }
                        }
                        style={styles.placeImage}
                    />
                    <Text className=" text-3xl font-bold self-center">
                        {results.tempat_nama}
                    </Text>

                    <View className="flex flex-col gap-3 my-4 justify-center m-5">
                        <View className="flex flex-row items-center gap-2">
                            <FontAwesomeIcon icon={solidStar} color="black" />
                            <Text className="">{results.tempat_rating}</Text>
                        </View>

                        <View className="flex flex-row items-center gap-2">
                            <FontAwesomeIcon icon={faCity} color="black" />
                            <Text className="">{results.tempat_kota}</Text>
                        </View>

                        <View className="flex flex-row items-center gap-2">
                            <FontAwesomeIcon icon={faTicket} color="black" />
                            <Text className="">{results.tempat_kategori}</Text>
                        </View>

                        <Text className=" text-justify">
                            {results.tempat_deskripsi}
                        </Text>
                    </View>

                    <View className="flex flex-row justify-between mx-5">
                        <View className="flex flex-row">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => {
                                        setRating(star);
                                        setHasRated(true);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            star <= rating
                                                ? solidStar
                                                : hollowStar
                                        }
                                        color="black"
                                        size={24}
                                        style={{ marginHorizontal: 4 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                setBookmark(!bookmark);
                                setHasBookmarked(true);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={bookmark ? solidBookmark : hollowBookmark}
                                color="black"
                                size={24}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="m-5 flex flex-col">
                        <View className="flex flex-row justify-between mx-5 my-1">
                            <Text className=" text-lg font-bold">Comments</Text>

                            <Pressable
                                className="bg-green-300 rounded flex flex-col py-1 px-2 justify-center"
                                onPress={onSubmit}
                            >
                                <Text className="">Submit</Text>
                            </Pressable>
                        </View>
                        <TextInput
                            className="w-full  placeholder:text-gray-400 bg-[rgba(138,138,138,0.35)] p-3 rounded"
                            multiline
                            textAlignVertical="top"
                            onChangeText={setComment}
                            value={comment}
                            placeholder="Add a comment..."
                        />
                    </View>

                    <View className="mt-4">
                        {results.Comments &&
                            results.Comments.map((item, index) => (
                                <View
                                    className="mx-4"
                                    key={index}
                                    style={styles.bookmarkCard}
                                >
                                    <View style={styles.bookmarkInfo}>
                                        {item.user_id == userId && (
                                            <Pressable
                                                className="items-end"
                                                onPress={() =>
                                                    onDelete(item.id, userId)
                                                }
                                            >
                                                <Text className="bg-red-500 rounded px-1">
                                                    Delete Comment
                                                </Text>
                                            </Pressable>
                                        )}

                                        <Text style={styles.bookmarkTitle}>
                                            {item.User.user_username}
                                        </Text>
                                        <Text style={styles.bookmarkLocation}>
                                            {item.comment_comment}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    imageContainer: {
        position: "relative",
        overflow: "hidden",
    },
    placeImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
});
