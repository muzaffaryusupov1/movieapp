import { image500 } from '@/api';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MovieCard({ item }: any) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Movie', item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{ width: '100%', height: height * 0.7 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
}
