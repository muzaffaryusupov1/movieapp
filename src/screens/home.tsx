import {
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpcomingMovie,
  fetchNowPlayingMovie,
  image342,
} from '@/api';
import Loader from '@/components/loader';
import TrendingMovie from '@/components/trending-movie';
import UpcomingMovie from '@/components/upcoming-movie';
import { MagnifyingGlassIcon } from '@react-native-icons/heroicons/16/solid';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = [
  { id: 1, title: 'Now playing' },
  { id: 2, title: 'Upcoming' },
  { id: 3, title: 'Top rated' },
  { id: 4, title: 'Popular' },
  { id: 5, title: 'Trending' },
];

export default function Home({ navigation }: any) {
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(1);

  useEffect(() => {
    getTrendingMovie();
  }, []);

  useEffect(() => {
    getMoviesByTab(selectedTab);
  }, [selectedTab]);

  const getMoviesByTab = async (id: number) => {
    let data = null;
    switch (id) {
      case 1:
        data = await fetchNowPlayingMovie();
        break;
      case 2:
        data = await fetchUpcomingMovie();
        break;
      case 3:
        data = await fetchTopRatedMovie();
        break;
      case 4:
        data = await fetchPopularMovie();
        break;
      case 5:
        data = await fetchTrendingMovie();
        break;
      default:
        data = await fetchNowPlayingMovie();
        break;
    }
    if (data && data.results) setMovies(data.results);
    setIsLoading(false);
  };

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    data.results && setTrending(data.results);
  };

  return (
    <View className="flex-1">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between pb-4 pt-2">
          <Image source={require('~assets/logo.png')} className="w-max h-12" />
          <TouchableOpacity onPress={() => navigation.navigate('Search')} className='rounded-full w-[50px] h-[50px] bg-neutral-800 flex items-center justify-center'>
            <MagnifyingGlassIcon color={'white'} width={24} height={24} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loader />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}>
          {trending.length > 0 && <TrendingMovie trending={trending.slice(0, 10)} />}
          <View className="my-4 px-1">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setSelectedTab(tab.id)}
                  className={`${selectedTab === tab.id ? 'border-b-2 border-white' : ''} px-4 py-2 border-b`}>
                  <Text className="text-white">{tab.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <UpcomingMovie upcoming={movies} title={tabs.find(t => t.id === selectedTab)?.title} />

          <View className="mt-4">
            <Text className="text-white font-semibold text-xl">Trending</Text>
            <TrendingMovie trending={trending.slice(0, 10)} />
          </View>

          {/* All movie no side scroll */}
          <View className="mt-4 px-4">
            <Text className="text-white font-semibold text-xl mb-4">All Movie</Text>
            {/* grid 2 cols */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {movies.map((movie: any) => (
                <View key={movie.id} style={{ width: '48%' }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Movie', movie.id)}>
                    <Image
                      source={{ uri: image342(movie.poster_path) }}
                      style={{ width: '100%', height: 250, borderRadius: 12 }}
                      resizeMode="cover"
                    />
                    <Text className="text-white font-semibold text-base mt-2" numberOfLines={2}>
                      {movie.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
