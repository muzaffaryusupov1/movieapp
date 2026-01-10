import AppNavigation from '@/navigations/app.navigation';
import './src/styles/global.css';
import { View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 bg-[#242A32]'>
      <AppNavigation />
    </View>
  )
}
