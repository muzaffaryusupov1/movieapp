import {
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpcomingMovie,
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
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(1);

  useEffect(() => {
    const getData = () => {
      getTrendingMovie();
      getUpcomingMovie();
      getTopRatedMovie();
      getPopularMovie();
      setIsLoading(false);
    };
    getData();
  }, []);

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    data.results && setTrending(data.results);
  };

  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie();
    data.results && setUpcoming(data.results);
  };

  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovie();
    data.results && setTopRated(data.results);
  };

  const getPopularMovie = async () => {
    const data = await fetchPopularMovie();
    data.results && setPopular(data.results);
  };

  return (
    <View className="flex-1">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between pb-4 pt-2">
          <Image source={require('~assets/logo.png')} className="w-max h-12" />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
          {trending.length > 0 && <TrendingMovie trending={trending.slice(0, 3)} />}
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
          {upcoming.length > 0 && <UpcomingMovie upcoming={upcoming} title="Upcoming Movie" />}
          {upcoming.length > 0 && (
            <UpcomingMovie upcoming={trending.reverse()} title="Trending Movie" />
          )}
          {popular.length > 0 && <UpcomingMovie upcoming={popular} title="Popular Movie" />}
          {topRated.length > 0 && <TrendingMovie trending={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}
