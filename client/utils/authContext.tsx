import { createContext, PropsWithChildren, useState } from "react";
import { useRouter } from "expo-router";

type AuthState = {
    isLoggedIn: boolean;
    token: string;
    logIn: (tokenResponse?: string) => void;
    logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    token: "",
    logIn: () => {},
    logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const router = useRouter();

    const logIn = (tokenResponse?: string) => {
        if (tokenResponse) {
            setIsLoggedIn(true);
            setToken(tokenResponse);
            router.replace("/");
        }
    };

    const logOut = () => {
        setIsLoggedIn(false);
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
