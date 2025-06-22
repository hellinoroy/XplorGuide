import { View, Text, Image, TextInput, Pressable } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "@/utils/authContext";
import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faEnvelope,
	faLock,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function LoginScreen() {
	const router = useRouter();
	const authContext = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [viewPassword, setViewPassword] = useState(true);

	const onSubmit = async () => {
		// console.log("hello")
		// authContext.logIn("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2YjIxMjFmLWJmMjAtNDI5NS05YmI2LTY5YTVmMGM3NDU0NiIsImlhdCI6MTc1MDA0OTIxMCwiZXhwIjoxNzUwNjU0MDEwfQ.TuThpGr587F-nh5cSplxzCYECv70qK1HJn_OtAf84xY")
		try {
			const response = await axios.post(
				"http://192.168.1.16:4040/api/auth/login",
				{
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			// console.log(response);
			authContext.logIn(response.data.accessToken);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error("Server error:", error.response?.data.message);
			} else {
				console.error("Unexpected error:", error);
			}
		}
	};

	return (
		<SafeAreaView>
			<LinearGradient
				className="h-screen w-screen"
				colors={["#22116D", "#4221D3"]}>
				<View className="p-3">
					<Image
						style={{
							width: 200,
							height: 200,
						}}
						source={require("../assets/images/placeholder_1.webp")}
					/>

					<View className="flex flex-col my-5">
						<Text className="text-white font-bold text-3xl">
							Hello,
						</Text>
						<Text className="text-white font-bold text-3xl">
							Welcome!
						</Text>
						<Text className="text-white mt-5">Xplore</Text>
					</View>

					<View>
						<Text className="text-white my-2">Email</Text>
						<View className="flex flex-row bg-[rgba(138,138,138,0.35)] items-center py-2 rounded ">
							<View className="px-4">
								<FontAwesomeIcon
									icon={faEnvelope}
									size={20}
									color="grey"
								/>
							</View>

							<TextInput
								className="w-full text-white placeholder:text-gray-400"
								onChangeText={setEmail}
								value={email}
								placeholder="Email"
							/>
						</View>
					</View>

					<View>
						<Text className="text-white my-2">Password</Text>
						<View className="flex flex-row bg-[rgba(138,138,138,0.35)] items-center py-2 rounded ">
							<View className="px-4">
								<FontAwesomeIcon
									icon={faLock}
									size={20}
									color="grey"
								/>
							</View>

							<TextInput
								className="grow text-white placeholder:text-gray-400"
								secureTextEntry={viewPassword}
								onChangeText={setPassword}
								value={password}
								placeholder="Password"
							/>

							<Pressable
								className="px-4"
								onPress={() => {
									setViewPassword(!viewPassword);
								}}>
								<FontAwesomeIcon
									icon={viewPassword ? faEyeSlash : faEye}
									size={20}
									color="grey"
								/>
							</Pressable>
						</View>
					</View>

					<Text className="self-end text-[#FF00EE] pt-4 font-bold">
						Forgot Password?
					</Text>

					<Pressable
						className="mx-3 my-5"
						onPress={onSubmit}>
						<LinearGradient
							colors={[
								"#2E0F38",
								"#581D6B",
								"#6C2385",
								"#812A9E",
							]}
							start={[0, 1]}
							end={[1, 0]}>
							<Text className="text-white text-center py-5">
								LOGIN
							</Text>
						</LinearGradient>
					</Pressable>

					<Text className="text-stone-200 text-center mt-5">
						Don't have an account?
						<Text
							className="text-[#FF00EE] font-bold"
							onPress={() => router.replace("/register")}>
							{" "}
							Register
						</Text>
					</Text>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}
