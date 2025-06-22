import {
    ScrollView,
    View,
    Text,
    Pressable,
    TextInput,
    Image,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../utils/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SearchComponent from "../../../components/listTempat";

import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import axios from "axios";

export default function Profile() {
    const authState = useContext(AuthContext);

    const [me, setMe] = useState<any>({});
    const [bookmark, setBookmark] = useState<any>([]);

    useEffect(() => {
        const fetchMe = async () => {
            // console.log("profile");
            const response = await axios.get(
                `http://192.168.1.6:4040/api/auth/me`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState.token}`,
                    },
                }
            );
            setMe(response.data.data);
            setBookmark(response.data.data.Bookmarks);
            // console.log(response.data.data)
            // console.log(response.data.data.Bookmarks);

            // console.log(response.data.data.Bookmarks[0].Tempat)
        };

        fetchMe();
    }, []);

    return (
        <SafeAreaView className="bg-white flex-1 flex-col">
            <LinearGradient
                className="h-full w-full"
                colors={["#22116D", "#4221D3"]}
            >
                <Image
                    className="self-center m-5 rounded-full"
                    source={require("../../../assets/images/placeholder_2.webp")}
                />

                <Text className="text-white text-center text-2xl font-bold gap-3">
                    {me.user_username}
                </Text>

                <View className="bg-[#717171] w-full py-5 justify-center flex flex-row">
                    <View className="flex flex-row justify-center items-center size-14 rounded-full bg-[#D9D9D9] p-5">
                        <FontAwesomeIcon
                            icon={faBookmark}
                            color="white"
                            size={24}
                        />
                    </View>
                </View>
                <ScrollView className="px-5">
                    {bookmark.length === 0 ? (
                        <Text className="text-center text-white">
                            No results found
                        </Text>
                    ) : (
                        bookmark.map((item: any, index: any) => (
                            <SearchComponent key={index} item={item.Tempat} />
                            // console.log(item)
                        ))
                    )}
                </ScrollView>

                <Pressable
                    onPress={() => authState.logOut()}
                    className="bg-red-500 rounded px-6 py-3"
                >
                    <Text className="text-white font-bold text-lg">Logout</Text>
                </Pressable>
            </LinearGradient>
        </SafeAreaView>
    );
}
