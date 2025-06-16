import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AuthProvider } from "../utils/authContext";
import "./global.css";

export default function RootLayout() {
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
