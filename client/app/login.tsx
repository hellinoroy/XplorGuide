// import { View, Text, Image, TextInput, Pressable} from "react-native";
// import { useContext, useState } from "react";
// import { AuthContext } from "@/utils/authContext";
// import axios from "axios";

// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";

// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import {
//     faEnvelope,
//     faLock,
//     faEye,
//     faEyeSlash,
// } from "@fortawesome/free-solid-svg-icons";

// export default function LoginScreen() {
//     const router = useRouter();
//     const authContext = useContext(AuthContext);

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [viewPassword, setViewPassword] = useState(true);

//     const onSubmit = async () => {
//         // console.log("hello")
//         authContext.logIn(
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4N2I4ZmFmLTVkMTgtNDYzZi05Y2RlLTE4ZTcyNjlmZWNhMSIsImlhdCI6MTc1MDY0NjY5NiwiZXhwIjoxNzUxMjUxNDk2fQ.BYncYwcpyYMFrtddDlf5ta03Nwbevb2LREXGKsJK8ts"
//         );
//         // try {
//         // 	const response = await axios.post(
//         // 		"http://192.168.1.8:4040/api/auth/login",
//         // 		{
//         // 			email,
//         // 			password,
//         // 		},
//         // 		{
//         // 			headers: {
//         // 				"Content-Type": "application/json",
//         // 			},
//         // 		}
//         // 	);
//         // 	console.log(response.data.accessToken);
//         // 	authContext.logIn(response.data.accessToken);
//         // } catch (error: unknown) {
//         // 	if (axios.isAxiosError(error)) {
//         // 		console.error("Server error:", error.response?.data.message);
//         // 	} else {
//         // 		console.error("Unexpected error:", error);
//         // 	}
//         // }
//     };

//     return (
//         <SafeAreaView>
//             <LinearGradient
//                 className="h-screen w-screen"
//                 colors={["#22116D", "#4221D3"]}
//             >
//                 <View className="p-3">
//                     <Image
//                         style={{
//                             width: 200,
//                             height: 200,
//                         }}
//                         source={require("../assets/images/placeholder_1.webp")}
//                     />

//                     <View className="flex flex-col my-5">
//                         <Text className="text-white font-bold text-3xl">
//                             Hello,
//                         </Text>
//                         <Text className="text-white font-bold text-3xl">
//                             Welcome!
//                         </Text>
//                         <Text className="text-white mt-5">Xplore</Text>
//                     </View>

//                     <View>
//                         <Text className="text-white my-2">Email</Text>
//                         <View className="flex flex-row bg-[rgba(138,138,138,0.35)] items-center py-2 rounded ">
//                             <View className="px-4">
//                                 <FontAwesomeIcon
//                                     icon={faEnvelope}
//                                     size={20}
//                                     color="grey"
//                                 />
//                             </View>

//                             <TextInput
//                                 className="w-full text-white placeholder:text-gray-400"
//                                 onChangeText={setEmail}
//                                 value={email}
//                                 placeholder="Email"
//                             />
//                         </View>
//                     </View>

//                     <View>
//                         <Text className="text-white my-2">Password</Text>
//                         <View className="flex flex-row bg-[rgba(138,138,138,0.35)] items-center py-2 rounded ">
//                             <View className="px-4">
//                                 <FontAwesomeIcon
//                                     icon={faLock}
//                                     size={20}
//                                     color="grey"
//                                 />
//                             </View>

//                             <TextInput
//                                 className="grow text-white placeholder:text-gray-400"
//                                 secureTextEntry={viewPassword}
//                                 onChangeText={setPassword}
//                                 value={password}
//                                 placeholder="Password"
//                             />

//                             <Pressable
//                                 className="px-4"
//                                 onPress={() => {
//                                     setViewPassword(!viewPassword);
//                                 }}
//                             >
//                                 <FontAwesomeIcon
//                                     icon={viewPassword ? faEyeSlash : faEye}
//                                     size={20}
//                                     color="grey"
//                                 />
//                             </Pressable>
//                         </View>
//                     </View>

//                     <Text className="self-end text-[#FF00EE] pt-4 font-bold">
//                         Forgot Password?
//                     </Text>

//                     <Pressable className="mx-3 my-5" onPress={onSubmit}>
//                         <LinearGradient
//                             colors={[
//                                 "#2E0F38",
//                                 "#581D6B",
//                                 "#6C2385",
//                                 "#812A9E",
//                             ]}
//                             start={[0, 1]}
//                             end={[1, 0]}
//                         >
//                             <Text className="text-white text-center py-5">
//                                 LOGIN
//                             </Text>
//                         </LinearGradient>
//                     </Pressable>

//                     <Text className="text-stone-200 text-center mt-5">
//                         Don't have an account?
//                         <Text
//                             className="text-[#FF00EE] font-bold"
//                             onPress={() => router.replace("/register")}
//                         >
//                             {" "}
//                             Register
//                         </Text>
//                     </Text>
//                 </View>
//             </LinearGradient>
//         </SafeAreaView>
//     );
// }


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
		// authContext.logIn("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4N2I4ZmFmLTVkMTgtNDYzZi05Y2RlLTE4ZTcyNjlmZWNhMSIsImlhdCI6MTc1MDc2MTU3OSwiZXhwIjoxNzUxMzY2Mzc5fQ.fl6JaVPaMSImhyhcCbYNtSmtSiFiw8tIGuVxXgaZFlM")
		try {
			const response = await axios.post(
				"http://192.168.1.8:4040/api/auth/login",
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
			// console.log(response.data.accessToken);
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
		<SafeAreaView className="flex-1">
			<LinearGradient
				className="flex-1 w-full"
				colors={["#047857", "#10B981", "#34D399"]}>
				{/* Main Container */}
				<View className="flex-1 px-8 pt-12">
					{/* Logo/Image Section */}
					<View className="items-center mb-8">
						<View className="w-32 h-32 bg-white/20 rounded-full items-center justify-center mb-6 shadow-2xl">
							<Image
								style={{
									width: 80,
									height: 80,
									borderRadius: 40,
								}}
								source={require("../assets/images/placeholder_1.webp")}
							/>
						</View>
					</View>

					{/* Welcome Section */}
					<View className="mb-2">
						<Text className="text-white font-bold text-4xl leading-tight">
							Selamat Datang
						</Text>
						<Text className="text-white font-bold text-4xl leading-tight mb-4">
							Kembali!
						</Text>
						<Text className="text-white/80 text-lg font-medium">
							Masuk ke akun Xplore Anda
						</Text>
					</View>

					{/* Form Section */}
					<View className="space-y-6">
						{/* Email Input */}
						<View>
							<Text className="text-white font-semibold text-base mb-3">
								Email
							</Text>
							<View className="flex-row bg-white/20 backdrop-blur-sm items-center py-4 px-5 rounded-2xl border border-white/30 shadow-lg">
								<View className="mr-4">
									<FontAwesomeIcon
										icon={faEnvelope}
										size={20}
										color="rgba(255,255,255,0.8)"
									/>
								</View>
								<TextInput
									className="flex-1 text-white text-base placeholder:text-white/60"
									onChangeText={setEmail}
									value={email}
									placeholder="Masukkan email Anda"
									placeholderTextColor="rgba(255,255,255,0.6)"
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</View>
						</View>

						{/* Password Input */}
						<View>
							<Text className="text-white font-semibold text-base mb-3">
								Password
							</Text>
							<View className="flex-row bg-white/20 backdrop-blur-sm items-center py-4 px-5 rounded-2xl border border-white/30 shadow-lg">
								<View className="mr-4">
									<FontAwesomeIcon
										icon={faLock}
										size={20}
										color="rgba(255,255,255,0.8)"
									/>
								</View>
								<TextInput
									className="flex-1 text-white text-base placeholder:text-white/60"
									secureTextEntry={viewPassword}
									onChangeText={setPassword}
									value={password}
									placeholder="Masukkan password Anda"
									placeholderTextColor="rgba(255,255,255,0.6)"
								/>
								<Pressable
									className="ml-4"
									onPress={() => {
										setViewPassword(!viewPassword);
									}}>
									<FontAwesomeIcon
										icon={viewPassword ? faEyeSlash : faEye}
										size={20}
										color="rgba(255,255,255,0.8)"
									/>
								</Pressable>
							</View>
						</View>
					</View>

					{/* Forgot Password */}
					{/* <Pressable className="self-end mt-6">
						<Text className="text-emerald-100 font-semibold text-base underline">
							Lupa Password?
						</Text>
					</Pressable> */}

					{/* Login Button */}
					<Pressable
						className="mt-8"
						onPress={onSubmit}>
						<LinearGradient
							className="py-5 px-8 rounded-2xl shadow-xl"
							colors={["#ffffff", "#f0f9ff", "#e0f2fe"]}
							start={[0, 0]}
							end={[1, 1]}>
							<Text className="text-emerald-700 text-center font-bold text-lg tracking-wide">
								MASUK
							</Text>
						</LinearGradient>
					</Pressable>

					{/* Register Button */}
					<Pressable
						className="w-full py-4 mt-3  bg-white"
						onPress={() => router.replace("/register")}>
						<Text className="text-emerald-700 text-center font-bold text-base">
							BUAT AKUN BARU
						</Text>
					</Pressable>

					{/* Bottom Decoration */}
					<View className="flex-1 justify-end pb-8">
						<View className="w-full h-1 bg-white/20 rounded-full mb-4"></View>
						<Text className="text-center text-white/60 text-sm">
							Xplore Guide Indonesia
						</Text>
					</View>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}
