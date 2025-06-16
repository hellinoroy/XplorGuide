import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../../../utils/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";
import SearchComponent from "../../../components/listTempat";

export default function SearchScreen() {
    const [target, setTarget] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const authState = useContext(AuthContext);

    const fetchListTempat = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.8:4040/api/destination/search?q=${encodeURIComponent(
                    target
                )}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState.token}`,
                    },
                }
            );
            // console.log("Search results:", response.data);
            setResults(response.data); 
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Server error:", error.response?.data.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1 flex-col">
            <LinearGradient
                className="h-full w-full"
                colors={["#22116D", "#4221D3"]}
            >
                <View className="flex flex-row bg-[#D9D9D9] rounded-full m-5 space-x-2">

                    <TextInput
                        className="rounded-xl flex-grow p-3 text-white mx-4"
                        placeholder="Search"
                        onChangeText={setTarget}
                        value={target}
                    />
                    <Pressable
                        className="p-3 mx-4"
                        onPress={fetchListTempat}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            size={20}
                            color="white"
                        />
                    </Pressable>
                </View>

                <ScrollView className="px-5">
                    {results.length === 0 ? (
                        <Text className="text-center text-white">No results found</Text>
                    ) : (
                        results.map((item, index) => (
                            <SearchComponent key={index} item={item} />
                            // console.log(item)
                        ))
                    )}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}
