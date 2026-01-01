import { image185 } from "@/api";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Cast({ cast }: any) {
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Actors</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                }}>
                {
                    cast.map((person: any, idx: number) => (
                        <TouchableOpacity key={idx} className="mr-4 items-center mb-6">
                            <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                                <Image className="rounded-2xl h-24 w-24" source={{ uri: image185(person?.profile_path) }} />
                            </View>
                            <Text className="text-white text-xs mt-1">
                                {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                            </Text>
                            <Text className="text-neutral-400 text-xs">
                                {person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}