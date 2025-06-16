import { Image, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

type Format = {
    tempat_id: string;
    tempat_foto: string;
    tempat_nama: string;
    tempat_kategori: string;
    tempat_kota: string;
};

export default function SearchComponent({ item }: { item: Format }) {
    const router = useRouter();

    const imageSource =
        item.tempat_foto && item.tempat_foto.trim() !== ""
            ? { uri: item.tempat_foto }
            : require("../assets/images/placeholder_2.webp");

    const handlePress = () => {
        router.push(`/search/${item.tempat_id}`);
    };

    return (
        <Pressable onPress={handlePress}>
            <View className="h-40 flex flex-row p-2 my-4">
                <Image
                    source={imageSource}
                    style={{ width: 100, height: 150, marginRight: 10 }}
                    resizeMode="cover"
                />

                <View className="flex-1 gap-2">
                    <Text
                        className="text-2xl font-bold text-white"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.tempat_nama}
                    </Text>
                    <Text className="text-white text-xl">{item.tempat_kategori}</Text>
                    <Text className="text-white">{item.tempat_kota}</Text>
                </View>
            </View>
        </Pressable>
    );
}
