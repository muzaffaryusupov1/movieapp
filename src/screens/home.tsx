import { Button, Text, View } from "react-native";

export default function Home({ navigation }: any) {

    return (
        <View className='flex-1 items-center justify-center bg-neutral-50'>
            <Text className="text-3xl font-bold">Home Page</Text>
            <Button title="Go to Detailed" onPress={() => navigation.navigate('Details')} />
        </View>
    )
}