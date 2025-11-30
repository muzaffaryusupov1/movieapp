import Home from "@/screens/home";
import Detailed from "@/screens/detailed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Details" component={Detailed} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
