import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

export default function RootLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					height: 70,
					paddingBottom: 10,
					paddingTop: 10,
					backgroundColor: "#fff",
					borderTopWidth: 1,
					borderTopColor: "#E5E7EB",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
					elevation: 5,
				},
				tabBarItemStyle: {
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
					marginTop: 4,
				},
				tabBarActiveTintColor: "#10B981",
				tabBarInactiveTintColor: "#9CA3AF",
			}}
			backBehavior="order">
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					tabBarLabel: "Beranda",
					tabBarIcon: ({ focused, color }) => (
						<Feather
							name="home"
							size={20}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="dashboard"
				options={{
					headerShown: false,
					tabBarLabel: "Dashboard",
					tabBarIcon: ({ focused, color }) => (
						<Feather
							name="menu"
							size={20}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					headerShown: false,
					tabBarLabel: "Search",
					tabBarIcon: ({ focused, color }) => (
						<Feather
							name="search"
							size={20}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ focused, color }) => (
						<Feather
							name="user"
							size={20}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
