import { MagnifyingGlassIcon } from '@react-native-icons/heroicons/16/solid';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }: any) {
  return (
    <View className="flex-1 bg-slate-950">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className="mx-4 flex-row items-center justify-between">
          <Image source={require('~assets/logo.png')} />
          <MagnifyingGlassIcon color={'white'} width={24} height={24} strokeWidth={2} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}></ScrollView>
    </View>
  );
}
