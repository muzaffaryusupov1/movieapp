import { ChevronLeftIcon } from "@react-native-icons/heroicons/16/solid";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full w-[50px] h-[50px] bg-neutral-800 flex items-center justify-center">
            <ChevronLeftIcon color={'white'} width={30} height={30} strokeWidth={2.5} />
        </TouchableOpacity>
    )
}