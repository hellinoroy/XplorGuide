import {
    faCalendar,
    faEnvelope,
    faEye,
    faEyeSlash,
    faIdCard,
    faLock,
    faMapPin,
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
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

export default function RegisterScreen() {
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
        setShowPicker((prev) => !prev);
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
                "http://192.168.1.8:4040/api/auth/register",
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
        <SafeAreaView className="flex-1">
            <LinearGradient
                className="flex-1 w-full"
                colors={["#047857", "#10B981", "#34D399"]}
            >
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Main Container */}
                    <View className="flex-1 px-8 pt-8 pb-8">
                        {/* Logo/Image Section */}
                        <View className="items-center mb-6">
                            <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-4 shadow-2xl">
                                <Image
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                    }}
                                    source={require("../assets/images/placeholder_1.webp")}
                                />
                            </View>
                        </View>

                        {/* Welcome Section */}
                        <View className="mb-8">
                            <Text className="text-white font-bold text-3xl leading-tight text-center">
                                Bergabung dengan
                            </Text>
                            <Text className="text-white font-bold text-3xl leading-tight mb-3 text-center">
                                Xplore Guide
                            </Text>
                            <Text className="text-white/80 text-base font-medium text-center">
                                Buat akun untuk memulai petualangan Anda
                            </Text>
                        </View>

                        {/* Form Section */}
                        <View className="space-y-5">
                            {/* Name Input */}
                            <View>
                                <Text className="text-white font-semibold text-sm mb-2">
                                    Nama Lengkap
                                </Text>
                                <View className="flex-row bg-white/20 backdrop-blur-sm items-center py-3 px-4 rounded-xl border border-white/30 shadow-lg">
                                    <View className="mr-3">
                                        <FontAwesomeIcon
                                            icon={faIdCard}
                                            size={18}
                                            color="rgba(255,255,255,0.8)"
                                        />
                                    </View>
                                    <TextInput
                                        className="flex-1 text-white text-base placeholder:text-white/60"
                                        onChangeText={setName}
                                        value={name}
                                        placeholder="Masukkan nama lengkap"
                                        placeholderTextColor="rgba(255,255,255,0.6)"
                                    />
                                </View>
                            </View>

                            {/* Date and City Row */}
                            <View className="flex-row space-x-4 gap-2">
                                {/* Date Input */}
                                <View className="flex-1">
                                    <Text className="text-white font-semibold text-sm mb-2">
                                        Tanggal Lahir
                                    </Text>
                                    <View className="flex-row bg-white/20 backdrop-blur-sm items-center py-3 px-4 rounded-xl border border-white/30 shadow-lg">
                                        <View className="mr-3">
                                            <FontAwesomeIcon
                                                icon={faCalendar}
                                                size={18}
                                                color="rgba(255,255,255,0.8)"
                                            />
                                        </View>

                                        {Platform.OS === "web" ? (
                                            <View className="flex-1">
                                                <input
                                                    type="date"
                                                    value={format(
                                                        date,
                                                        "yyyy-MM-dd"
                                                    )}
                                                    onChange={(e) =>
                                                        setDate(
                                                            new Date(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            "transparent",
                                                        color: "white",
                                                        border: "none",
                                                        outline: "none",
                                                        fontSize: 16,
                                                        width: "100%",
                                                    }}
                                                />
                                            </View>
                                        ) : (
                                            <Pressable
                                                className="flex-1"
                                                onPress={toggleDatePicker}
                                            >
                                                <TextInput
                                                    className="placeholder:text-white/60 text-white text-base"
                                                    placeholder="Pilih tanggal"
                                                    value={
                                                        isToday(date)
                                                            ? ""
                                                            : format(
                                                                  date,
                                                                  "dd/MM/yyyy"
                                                              )
                                                    }
                                                    editable={false}
                                                    pointerEvents="none"
                                                    placeholderTextColor="rgba(255,255,255,0.6)"
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

                                {/* City Input */}
                                <View className="flex-1">
                                    <Text className="text-white font-semibold text-sm mb-2">
                                        Kota
                                    </Text>
                                    <View className="flex-row bg-white/20 backdrop-blur-sm items-center py-3 px-4 rounded-xl border border-white/30 shadow-lg">
                                        <View className="mr-3">
                                            <FontAwesomeIcon
                                                icon={faMapPin}
                                                size={18}
                                                color="rgba(255,255,255,0.8)"
                                            />
                                        </View>
                                        <TextInput
                                            className="flex-1 text-white text-base placeholder:text-white/60"
                                            onChangeText={setAddress}
                                            value={address}
                                            placeholder="Kota"
                                            placeholderTextColor="rgba(255,255,255,0.6)"
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* Email Input */}
                            <View>
                                <Text className="text-white font-semibold text-sm mb-2">
                                    Email
                                </Text>
                                <View className="flex-row bg-white/20 backdrop-blur-sm items-center py-3 px-4 rounded-xl border border-white/30 shadow-lg">
                                    <View className="mr-3">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            size={18}
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
                                <Text className="text-white font-semibold text-sm mb-2">
                                    Password
                                </Text>
                                <View className="flex-row bg-white/20 backdrop-blur-sm items-center py-3 px-4 rounded-xl border border-white/30 shadow-lg">
                                    <View className="mr-3">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            size={18}
                                            color="rgba(255,255,255,0.8)"
                                        />
                                    </View>
                                    <TextInput
                                        className="flex-1 text-white text-base placeholder:text-white/60"
                                        secureTextEntry={viewPassword}
                                        onChangeText={setPassword}
                                        value={password}
                                        placeholder="Masukkan password"
                                        placeholderTextColor="rgba(255,255,255,0.6)"
                                    />
                                    <Pressable
                                        className="ml-3"
                                        onPress={() => {
                                            setViewPassword(!viewPassword);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                viewPassword
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                            size={18}
                                            color="rgba(255,255,255,0.8)"
                                        />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Confirm Password Input */}
                            <View>
                                <Text className="text-white font-semibold text-sm mb-2">
                                    Konfirmasi Password
                                </Text>
                                <View className="flex-row bg-white/20 backdrop-blur-sm items-center py-3 px-4 rounded-xl border border-white/30 shadow-lg">
                                    <View className="mr-3">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            size={18}
                                            color="rgba(255,255,255,0.8)"
                                        />
                                    </View>
                                    <TextInput
                                        className="flex-1 text-white text-base placeholder:text-white/60"
                                        secureTextEntry={viewConfirmPassword}
                                        onChangeText={setConfirmPassword}
                                        value={confirmPassword}
                                        placeholder="Konfirmasi password"
                                        placeholderTextColor="rgba(255,255,255,0.6)"
                                    />
                                    <Pressable
                                        className="ml-3"
                                        onPress={() => {
                                            setViewConfirmPassword(
                                                !viewConfirmPassword
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                viewConfirmPassword
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                            size={18}
                                            color="rgba(255,255,255,0.8)"
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        {/* Register Button */}
                        <Pressable className="mt-8 mb-6" onPress={onSubmit}>
                            <LinearGradient
                                className="py-4 px-8 rounded-xl shadow-xl"
                                colors={["#ffffff", "#f0f9ff", "#e0f2fe"]}
                                start={[0, 0]}
                                end={[1, 1]}
                            >
                                <Text className="text-emerald-700 text-center font-bold text-lg tracking-wide">
                                    DAFTAR SEKARANG
                                </Text>
                            </LinearGradient>
                        </Pressable>

                        {/* Login Button */}
                        <Pressable
                            className="w-full border-2 border-white/30 py-4 rounded-xl bg-white/10 mb-6"
                            onPress={() => router.replace("/login")}
                        >
                            <Text className="text-white text-center font-semibold text-base">
                                Sudah Punya Akun? Masuk
                            </Text>
                        </Pressable>

                        {/* Bottom Decoration */}
                        <View className="items-center">
                            <View className="w-full h-1 bg-white/20 rounded-full mb-4"></View>
                            <Text className="text-center text-white/60 text-sm">
                                Xplore Guide Indonesia
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}
