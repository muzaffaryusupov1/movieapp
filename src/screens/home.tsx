import { MagnifyingGlassIcon } from '@react-native-icons/heroicons/16/solid';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }: any) {
  return (
    <View className="flex-1 bg-slate-950">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className={''}>
          <Image source={require('~assets/logo.png')} />
          <MagnifyingGlassIcon />
        </View>
      </SafeAreaView>
    </View>
  );
}
