import { fetchPersonalDetail, fetchPersonMovies, image342 } from "@/api";
import Loader from "@/components/loader";
import UpcomingMovie from "@/components/upcoming-movie";
import { ChevronLeftIcon, HeartIcon } from "@react-native-icons/heroicons/16/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function Person() {
    const [isLoading, setIsLoading] = useState(true)
    const [person, setPerson] = useState([])
    const [personMovies, setPersonMovies] = useState([])
    const { params: { id } } = useRoute()
    const navigation = useNavigation()
    const [isFavourite, setIsFavourite] = useState(false)

    useEffect(() => {
        getPersonDetail()
        getPersonMovies()
    }, [id])

    const getPersonDetail = async () => {
        const data = await fetchPersonalDetail(id)
        setPerson(data)
        setIsLoading(false)
    }

    const getPersonMovies = async () => {
        const data = await fetchPersonMovies(id)
        setPersonMovies(data?.cast)
        setIsLoading(false)
    }

    return (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView className="absolute z-20 w-full flex-row items-center justify-between px-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon color={'white'} width={30} height={30} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite((prev) => !prev)}>
                    <HeartIcon
                        color={isFavourite ? 'red' : 'white'}
                        width={35}
                        height={35}
                        strokeWidth={2.5}
                    />
                </TouchableOpacity>
            </SafeAreaView>
            {isLoading ?
                <View className="flex-1 items-center justify-center h-screen">
                    <Loader />
                </View>
                :
                <View>
                    <View className="flex-row justify-center" style={{ shadowColor: 'gray', shadowRadius: 40, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1 }}>
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                            <Image source={{ uri: image342(person?.profile_path) }} style={{ width: width * 0.74, height: height * 0.43, }} />
                        </View>
                    </View>
                    <View className="mt-6">
                        <Text className="text-center text-3xl font-bold tracking-widest text-white">
                            {person?.name}
                        </Text>
                        <Text className="text-center text-base font-semibold text-neutral-400">
                            {person?.place_of_birth}
                        </Text>
                    </View>
                    <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-slate-800 rounded-full">
                        <View className="border-r-2 border-r-slate-500 px-2 items-center">
                            <Text className="text-white font-semibold">Gender</Text>
                            <Text className="text-neutral-400 text-sm">{person?.gender === 1 ? 'Female' : 'Male'}</Text>
                        </View>
                        <View className="border-r-2 border-r-slate-500 px-2 items-center">
                            <Text className="text-white font-semibold">Birthday</Text>
                            <Text className="text-neutral-400 text-sm">{person?.birthday}</Text>
                        </View>
                        <View className="border-r-2 border-r-slate-500 px-2 items-center">
                            <Text className="text-white font-semibold">Known For</Text>
                            <Text className="text-neutral-400 text-sm">{person?.known_for_department}</Text>
                        </View>
                        <View className="border-r-2 border-r-slate-500 px-2 items-center">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-400 text-sm">{person?.popularity.toFixed(2)}%</Text>
                        </View>
                    </View>

                    <View className="my-6 mx-4 space-y-2">
                        <Text className="text-white font-semibold text-xl">Biography</Text>
                        <Text className="text-neutral-400 text-sm tracking-wide">{person?.biography}</Text>
                    </View>
                    {person.id && personMovies?.length > 0 && <UpcomingMovie upcoming={personMovies} title="Known For" />}
                </View>
            }
        </ScrollView>
    )
}