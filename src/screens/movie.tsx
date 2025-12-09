import { ChevronLeftIcon, HeartIcon } from '@react-native-icons/heroicons/24/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Movie() {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const { params: item } = useRoute();

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
      </View>
    </ScrollView>
  );
}
