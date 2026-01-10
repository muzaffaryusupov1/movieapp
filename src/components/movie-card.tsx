import { image500 } from '@/api';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

const { height } = Dimensions.get('window');

export default function MovieCard({ item }: any) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Movie', item.id)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: '100%',
          height: height * 0.4,
        }}
        className="rounded-3xl"
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  );
}
