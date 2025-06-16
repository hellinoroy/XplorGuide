import { Redirect, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { AuthContext } from "../../utils/authContext";

export default function RootLayout() {
    const authState = useContext(AuthContext);

    if (!authState.isLoggedIn) {
        return <Redirect href="/login" />;
    }

    return (
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="search/[id]" options={{ headerShown: false }} />
            </Stack>
    );
}
