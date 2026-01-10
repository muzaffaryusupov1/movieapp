import { fetchSearchMovie } from "@/api";
import { XMarkIcon } from "@react-native-icons/heroicons/24/outline";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

    const handleTextDebounce = useCallback(debounce(handleSearch, 500), [])

    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <View className="mx-4 mb-3 flex-row items-center justify-between border border-neutral-400 rounded-full">
                <TextInput onChangeText={handleTextDebounce} placeholder="Search" placeholderTextColor={'lightgray'} className="pl-6 flex-1 text-base font-semibold text-white tracking-wide" />
                <TouchableOpacity className="rounded-full p-3 m-1 bg-neutral-400" onPress={() => navigation.goBack()}>
                    <XMarkIcon color={'white'} width={25} height={25} strokeWidth={2} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
