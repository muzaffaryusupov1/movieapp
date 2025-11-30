import { Button, Text, View } from "react-native";

export default function Detailed({ navigation }: any) {
    return (
        <View className='flex-1 items-center justify-center bg-neutral-50'>
            <Text className="text-3xl font-bold">Detailed Page</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    )
}