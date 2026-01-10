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
    <View className="flex-1 items-center">
      <Carousel
        width={width}
        height={height * 0.4}
        data={trending}
        renderItem={({ item }) => <MovieCard item={item} />}
        loop={true}
        autoPlay={true}
        autoPlayInterval={4000}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        style={{
          width: width,
          height: height * 0.4,
        }}
        vertical={false}
      />
    </View>
  );
}
