import { fetchMovieCredits, fetchMovieDetail, fetchSimilarMovie, image500 } from '@/api';
import Cast from '@/components/cast';
import Loader from '@/components/loader';
import UpcomingMovie from '@/components/upcoming-movie';
import { ChevronLeftIcon, HeartIcon } from '@react-native-icons/heroicons/24/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Movie() {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const { params: id } = useRoute();
  const [movie, setMovie] = useState<any>({});
  const [cast, setCast] = useState<any[]>([]);
  const [similarMovie, setSimilarMovie] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getMovieDetail();
    getMovieCredits();
    getSimilarMovie();
    setIsLoading(false);
  }, [id]);

  const getMovieDetail = async () => {
    const data = await fetchMovieDetail(id as string);
    setMovie(data);
  };


  const getMovieCredits = async () => {
    const data = await fetchMovieCredits(id as string);
    setCast(data.cast);
  };

  const getSimilarMovie = async () => {
    const data = await fetchSimilarMovie(id as string);
    setSimilarMovie(data.results);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-slate-950">
      <View className="w-full">
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
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loader />
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie.poster_path) }}
              style={{ width: width, height: height * 0.5 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                width,
                height: height * 0.4,
              }}
            />
          </View>
        )}
      </View>

      <View className="gap-4 space-y-4" style={{ marginTop: -40 }}>
        <Text className="text-center text-3xl font-bold tracking-widest text-white">
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text className="text-center text-base font-semibold text-neutral-400">
            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie.runtime} min
          </Text>
        ) : null}

        <View className="mx-4 flex-row justify-center space-x-2">
          {movie?.genres?.map((genre, idx) => (
            <Text key={idx} className="text-center text-base font-semibold text-neutral-400">
              {genre.name} {idx + 1 !== movie.genres.length ? '• ' : null}
            </Text>
          ))}
        </View>

        <Text className="mx-4 mt-3 text-base tracking-wide text-neutral-400">{movie.overview}</Text>
      </View>

      {
        movie.id && cast?.length > 0 && <Cast cast={cast} />
      }
      {
        movie.id && similarMovie?.length > 0 && <UpcomingMovie upcoming={similarMovie} title="Similar Movies" />
      }
    </ScrollView>
  );
}
