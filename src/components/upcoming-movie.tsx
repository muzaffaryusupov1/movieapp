import { image185 } from '@/api';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function UpcomingMovie({ upcoming, title }: { upcoming: any; title?: string }) {
  return (
    <View className="mb-8 space-y-4">
      <Text className="mb-3.5 px-1 text-2xl font-semibold text-red-400">{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {upcoming.map((item: any, idx: number) => (
          <View className="mr-4 space-y-1" key={idx}>
            <Image
              source={{ uri: image185(item.poster_path) }}
              className="rounded-3xl"
              style={{ width: width * 0.3, height: height * 0.2 }}
            />
            <Text className="text-white">
              {item.title.length > 12 ? item.title.slice(0, 12) + '...' : item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
