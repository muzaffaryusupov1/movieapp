import { image185 } from '@/api';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function UpcomingMovie({ upcoming, title }: { upcoming: any; title?: string }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <Text className="mb-3.5 px-1 text-2xl font-semibold text-white">{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {upcoming.map((item: any, idx: number) => (
          <TouchableWithoutFeedback key={idx} onPress={() => navigation.navigate('Movie', item)}>
            <View className="mr-4 space-y-1">
              <Image
                source={{ uri: image185(item.poster_path) }}
                className="rounded-3xl"
                style={{ width: width * 0.3, height: height * 0.2 }}
              />
              <Text className="text-white">
                {item.title.length > 12 ? item.title.slice(0, 12) + '...' : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
