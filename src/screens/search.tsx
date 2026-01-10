import { fetchSearchMovie, image185 } from "@/api";
import Loader from "@/components/loader";
import { XMarkIcon } from "@react-native-icons/heroicons/24/outline";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

export default function Search() {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()

    const handleSearch = (searchText: string) => {
        if (searchText && searchText.length > 3) {
            setIsLoading(true)
            fetchSearchMovie({
                query: searchText,
                include_adult: false,
                page: "1"
            }).then(data => {
                setIsLoading(false)
                setResults(data.results)
                console.log('API response', data)
            })
        } else {
            setResults([])
            setIsLoading(false)
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className="flex-1">
            <View className="mx-4 mb-3 flex-row items-center justify-between border border-neutral-400 rounded-full">
                <TextInput onChangeText={handleTextDebounce} placeholder="Search" placeholderTextColor={'lightgray'} className="pl-6 flex-1 text-base font-semibold text-white tracking-wide" />
                <TouchableOpacity className="rounded-full p-3 m-1 bg-neutral-400" onPress={() => navigation.goBack()}>
                    <XMarkIcon color={'white'} width={25} height={25} strokeWidth={2} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center h-full">
                    <Loader />
                </View>
            ) : results.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className="space-y-3">
                    <Text className="text-white text-lg font-semibold ml-1">
                        Result ({results.length})
                    </Text>
                    <View className="flex-row justify-between flex-wrap">
                        {results.map((item: any) => (
                            <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('Movie', item.id)}>
                                <View className="space-y-2 mb-4">
                                    <Image source={{ uri: image185(item.poster_path) }} className="rounded-3xl" style={{
                                        width: width * 0.44,
                                        height: height * 0.3
                                    }} />
                                    <Text className="text-gray-300 ml-1">
                                        {item.title.length > 22 ? item.title.substring(0, 22) + '...' : item.title}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View className="justify-center items-center">
                    <Image source={require('~assets/not-found.png')} className="h-96 w-96" />
                    <Text className="text-3xl text-white font-semibold text-center">Movies not found</Text>
                </View>
            )}
        </SafeAreaView>
    )
}
