import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AuthProvider } from "../utils/authContext";
import "./global.css";
import { usePushNotifications } from "@/utils/usePushNotification";

export default function RootLayout() {
    // const { expoPushToken, notification } = usePushNotifications()
    // const data = JSON.stringify(notification, undefined, 2);
    // console.log(expoPushToken?.data ?? "")
    // console.log(data)
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen
                    name="(protected)"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="login"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="register"
                    options={{ headerShown: false }}
                />
            </Stack>
        </AuthProvider>
    );
}
