import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import { useState, useContext, useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "../../../utils/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";
import SearchComponent from "../../../components/listTempat";


export default function HomeScreen() {
    const authState = useContext(AuthContext);
    console.log(authState.token);
    const [recommendation, setReccomendation] = useState<any>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchRecommendation = async () => {
                try {
                    const response = await axios.get(
                        "http://192.168.1.8:4040/api/destination/recommendation",
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authState.token}`,
                            },
                        }
                    );
                    // console.log(response.data);
                    setReccomendation(response.data);
                } catch (error) {
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

            if (authState.token) {
                fetchRecommendation();
            }
        }, [authState.token])
    );
    return (
        <SafeAreaView className="bg-white flex-1 flex-col">
            <LinearGradient
                className="h-full w-full"
                colors={["#22116D", "#4221D3"]}
            >
                <ScrollView>
                    {recommendation.length === 0 ? (
                        <Text className="text-center text-white">
                            No results found
                        </Text>
                    ) : (
                        recommendation.map((item, index) => (
                            <SearchComponent key={index} item={item} />
                            // console.log(item)
                        ))
                    )}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}
