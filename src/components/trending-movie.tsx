import React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import MovieCard from './movie-card';

const { width, height } = Dimensions.get('window');

interface TrendingMovieProps {
  trending: any;
}

export default function TrendingMovie({ trending }: TrendingMovieProps) {
  return (
    <View className="mb-5">
      <Carousel
        height={height * 0.7}
        data={trending}
        renderItem={({ item }) => <MovieCard item={item} />}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width}
        style={{
          width: width,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
}
