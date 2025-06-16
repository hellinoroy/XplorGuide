import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                // tabBarShowLabel: false,

                tabBarStyle: {
                    height: 50,
                },
                tabBarItemStyle: {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
            backBehavior="order"
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarLabel: "Index",
                    // tabBarIcon: ({ focused }) => (
                    //     <View
                    //         className={`min-w-[50px] min-h-[50px] flex rounded-full items-center justify-center ${
                    //             focused ? "bg-red-700 " : "bg-gray-700"
                    //         }`}
                    //     >
                    //         <FontAwesomeIcon
                    //             icon={faHome}
                    //             size={30}
                    //             color={"white"}
                    //         />
                    //     </View>
                    // ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarLabel: "Search",
                    // tabBarIcon: ({ focused }) => (
                    //     <View
                    //         className={`min-w-[50px] min-h-[50px] flex rounded-full items-center justify-center ${
                    //             focused ? "bg-red-700 " : "bg-gray-700"
                    //         }`}
                    //     >
                    //         <FontAwesomeIcon
                    //             icon={faHome}
                    //             size={30}
                    //             color={"white"}
                    //         />
                    //     </View>
                    // ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarLabel: "Profile",
                    // tabBarIcon: ({ focused }) => (
                    //     <View
                    //         className={`min-w-[50px] min-h-[50px] flex rounded-full items-center justify-center ${
                    //             focused ? "bg-red-700 " : "bg-gray-700"
                    //         }`}
                    //     >
                    //         <FontAwesomeIcon
                    //             icon={faHome}
                    //             size={30}
                    //             color={"white"}
                    //         />
                    //     </View>
                    // ),
                }}
            />
        </Tabs>
    );
}
