import Home from '@/screens/home';
import Movie from '@/screens/movie';
import Person from '@/screens/person';
import Search from '@/screens/search';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'ios_from_right' }} />
        <Stack.Screen name="Movie" component={Movie} options={{ headerShown: false, animation: 'ios_from_right' }} />
        <Stack.Screen name="Person" component={Person} options={{ headerShown: false, animation: 'ios_from_right' }} />
        <Stack.Screen name='Search' component={Search} options={{ headerShown: false, animation: 'ios_from_right' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
