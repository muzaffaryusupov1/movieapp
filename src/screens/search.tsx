import { fetchSearchMovie, image185 } from "@/api";
import Loader from "@/components/loader";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";
import { useCallback, useMemo, useRef, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native";
import { Dimensions } from "react-native";
import BackButton from "@/components/core/back-button";
import { AdjustmentsHorizontalIcon } from "@react-native-icons/heroicons/16/solid";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window')

const GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' },
]

const YEARS = ['2024', '2023', '2022', '2021', '2020', '2019']

const RATINGS = [
    { label: '9+ ⭐', value: 9 },
    { label: '8+ ⭐', value: 8 },
    { label: '7+ ⭐', value: 7 },
    { label: '6+ ⭐', value: 6 },
]

const SORT_OPTIONS = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Rating', value: 'rating' },
    { label: 'Release Date', value: 'release_date' },
    { label: 'Title A-Z', value: 'title' },
]

export default function Search() {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()

    // Bottom Sheet
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['25%', '75%'], [])

    // Filter States (placeholder - not functional yet)
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])
    const [selectedYear, setSelectedYear] = useState<string | null>(null)
    const [selectedRating, setSelectedRating] = useState<number | null>(null)
    const [sortBy, setSortBy] = useState<string>('popularity')

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

    const handleFilter = () => {
        bottomSheetRef.current?.snapToIndex(1)
    }

    const handleCloseBottomSheet = () => {
        bottomSheetRef.current?.close()
    }

    const handleApplyFilters = () => {
        // Filter logic will be implemented later
        console.log('Filters:', { selectedGenres, selectedYear, selectedRating, sortBy })
        handleCloseBottomSheet()
    }

    const handleClearFilters = () => {
        setSelectedGenres([])
        setSelectedYear(null)
        setSelectedRating(null)
        setSortBy('popularity')
    }

    const toggleGenre = (genreId: number) => {
        setSelectedGenres(prev =>
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        )
    }

    const renderBackdrop = useCallback(
        (props: any) => (
            // @ts-ignore
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    )

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 pt-2">
                <View className="flex flex-row items-center mb-3 px-2 gap-2">
                    <BackButton />
                    <View className="flex-1 flex-row items-center justify-between rounded-full bg-neutral-800">
                        <TextInput onChangeText={handleTextDebounce} placeholder="Search" placeholderTextColor={'lightgray'} className="pl-6 flex-1 text-base font-semibold text-white tracking-wide" />
                        <TouchableOpacity onPress={handleFilter} className="p-3">
                            <AdjustmentsHorizontalIcon color={'white'} width={25} height={25} strokeWidth={2} />
                        </TouchableOpacity>
                    </View>
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

            {/* Bottom Sheet Filter */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: '#171717' }}
                handleIndicatorStyle={{ backgroundColor: '#525252' }}
            >
                <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                    {/* Header */}
                    <View className="mb-6">
                        <Text className="text-white text-2xl font-bold">🎬 Filter Movies</Text>
                    </View>

                    {/* Genre Section */}
                    <View className="mb-6">
                        <Text className="text-white text-lg font-semibold mb-3">Genre</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {GENRES.map(genre => (
                                <TouchableOpacity
                                    key={genre.id}
                                    onPress={() => toggleGenre(genre.id)}
                                    style={{
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        borderRadius: 20,
                                        backgroundColor: selectedGenres.includes(genre.id) ? '#eab308' : '#262626',
                                        borderWidth: 1,
                                        borderColor: selectedGenres.includes(genre.id) ? '#eab308' : '#404040',
                                    }}
                                >
                                    <Text style={{
                                        color: selectedGenres.includes(genre.id) ? '#000' : '#fff',
                                        fontWeight: selectedGenres.includes(genre.id) ? '600' : '400'
                                    }}>
                                        {genre.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Year Section */}
                    <View className="mb-6">
                        <Text className="text-white text-lg font-semibold mb-3">Release Year</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {YEARS.map(year => (
                                <TouchableOpacity
                                    key={year}
                                    onPress={() => setSelectedYear(year === selectedYear ? null : year)}
                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        backgroundColor: selectedYear === year ? '#eab308' : '#262626',
                                        borderWidth: 1,
                                        borderColor: selectedYear === year ? '#eab308' : '#404040',
                                    }}
                                >
                                    <Text style={{
                                        color: selectedYear === year ? '#000' : '#fff',
                                        fontWeight: selectedYear === year ? '600' : '400'
                                    }}>
                                        {year}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Rating Section */}
                    <View className="mb-6">
                        <Text className="text-white text-lg font-semibold mb-3">Minimum Rating</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {RATINGS.map(rating => (
                                <TouchableOpacity
                                    key={rating.value}
                                    onPress={() => setSelectedRating(rating.value === selectedRating ? null : rating.value)}
                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        backgroundColor: selectedRating === rating.value ? '#eab308' : '#262626',
                                        borderWidth: 1,
                                        borderColor: selectedRating === rating.value ? '#eab308' : '#404040',
                                    }}
                                >
                                    <Text style={{
                                        color: selectedRating === rating.value ? '#000' : '#fff',
                                        fontWeight: selectedRating === rating.value ? '600' : '400'
                                    }}>
                                        {rating.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Sort By Section */}
                    <View className="mb-6">
                        <Text className="text-white text-lg font-semibold mb-3">Sort By</Text>
                        <View style={{ gap: 8 }}>
                            {SORT_OPTIONS.map(option => (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => setSortBy(option.value)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingVertical: 12,
                                        paddingHorizontal: 16,
                                        borderRadius: 12,
                                        backgroundColor: sortBy === option.value ? '#262626' : 'transparent',
                                        borderWidth: 1,
                                        borderColor: sortBy === option.value ? '#eab308' : '#404040',
                                    }}
                                >
                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: sortBy === option.value ? '#eab308' : '#525252',
                                        marginRight: 12,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {sortBy === option.value && (
                                            <View style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: '#eab308',
                                            }} />
                                        )}
                                    </View>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontWeight: sortBy === option.value ? '600' : '400'
                                    }}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20, marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={handleClearFilters}
                            style={{
                                flex: 1,
                                paddingVertical: 14,
                                borderRadius: 12,
                                backgroundColor: '#262626',
                                borderWidth: 1,
                                borderColor: '#404040',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                                Clear All
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleApplyFilters}
                            style={{
                                flex: 1,
                                paddingVertical: 14,
                                borderRadius: 12,
                                backgroundColor: '#eab308',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>
                                Apply Filter
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}
