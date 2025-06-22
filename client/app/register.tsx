import {
	faCalendar,
	faEnvelope,
	faEye,
	faEyeSlash,
	faIdCard,
	faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, isToday } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Image,
	Platform,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

export default function LoginScreen() {
	const isWeb = Platform.OS === "web";

	const router = useRouter();

	const [name, setName] = useState("");
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [address, setAddress] = useState("");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [viewPassword, setViewPassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [viewConfirmPassword, setViewConfirmPassword] = useState(true);

	const toggleDatePicker = () => {
		setShowPicker(prev => !prev);
	};

	const onChangeDate = (_, selectedDate) => {
		if (selectedDate) {
			setDate(selectedDate);
			setShowPicker(false);
		}
	};

	const onSubmit = async () => {
		try {
			await axios.post(
				"http://192.168.1.16:4040/api/auth/register",
				{
					name,
					email,
					address,
					date,
					password,
					confirmPassword,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			router.replace("/login");
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

					<View>
						<Text className="text-white my-2">Name</Text>
						<View className="flex flex-row bg-[rgba(138,138,138,0.35)] items-center py-2 rounded ">
							<View className="px-4">
								<FontAwesomeIcon
									icon={faIdCard}
									size={20}
									color="grey"
								/>
							</View>

							<TextInput
								className="w-full text-white placeholder:text-gray-400"
								onChangeText={setName}
								value={name}
								placeholder="Name"
							/>
						</View>
					</View>

					<View className="flex flex-row justify-between">
						<View className="w-[48%]">
							<Text className="text-white my-2">Date</Text>
							<View className="flex flex-row bg-[rgba(138,138,138,0.35)] items-center py-2 rounded ">
								<View className="px-4">
									<FontAwesomeIcon
										icon={faCalendar}
										size={20}
										color="grey"
									/>
								</View>

								{Platform.OS === "web" ? (
									// 🖥 Web version: use plain HTML date input
									<View className="bg-custom-grey rounded flex flex-row justify-between items-center px-3 py-2">
										<input
											type="date"
											value={format(date, "yyyy-MM-dd")}
											onChange={e =>
												setDate(
													new Date(e.target.value)
												)
											}
											style={{
												backgroundColor: "transparent",
												color: "white",
												border: "none",
												outline: "none",
												fontSize: 16,
												width: "100%",
											}}
										/>
									</View>
								) : (
									// 📱 Native version: use Pressable + DateTimePicker
									<Pressable
										className="bg-custom-grey rounded flex flex-row justify-between items-center px-3 py-2"
										onPress={toggleDatePicker}>
										<TextInput
											className="placeholder:text-gray-400 text-white"
											placeholder="Tanggal"
											value={
												isToday(date)
													? ""
													: format(date, "PPP")
											}
											editable={false}
											pointerEvents="none"
										/>

										{showPicker && (
											<DateTimePicker
												value={date}
												onChange={onChangeDate}
												mode="date"
												display="default"
											/>
										)}
									</Pressable>
								)}
							</View>
						</View>

						<View className="w-[48%]">
							<Text className="text-white my-2">City</Text>
							<View className="flex flex-row bg-[rgba(138,138,138,0.35)] items-center py-2 rounded ">
								<TextInput
									className="text-white placeholder:text-gray-400 pl-4"
									onChangeText={setAddress}
									value={address}
									placeholder="City"
								/>
							</View>
						</View>
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

					<View>
						<Text className="text-white my-2">
							Confirm Password
						</Text>
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
								secureTextEntry={viewConfirmPassword}
								onChangeText={setConfirmPassword}
								value={confirmPassword}
								placeholder="Confirm Password"
							/>

							<Pressable
								className="px-4"
								onPress={() => {
									setViewConfirmPassword(
										!viewConfirmPassword
									);
								}}>
								<FontAwesomeIcon
									icon={
										viewConfirmPassword ? faEyeSlash : faEye
									}
									size={20}
									color="grey"
								/>
							</Pressable>
						</View>
					</View>

					<Pressable
						className="mx-3 my-5"
						onPress={() => {
							onSubmit();
						}}>
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
								REGISTER
							</Text>
						</LinearGradient>
					</Pressable>

					<Text className="text-stone-200 text-center mt-5">
						Have an account?
						<Text
							className="text-[#FF00EE] font-bold"
							onPress={() => router.replace("/login")}>
							{" "}
							Login
						</Text>
					</Text>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}
