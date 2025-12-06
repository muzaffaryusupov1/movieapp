import { image500 } from '@/api';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MovieCard({ item }: any) {
  return (
    <View>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{ width: '100%', height: height * 0.7 }}
        className="rounded-3xl"
      />
    </View>
  );
}
