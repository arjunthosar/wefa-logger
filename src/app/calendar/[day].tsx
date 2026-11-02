import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Day() {
    
    const { day } = useLocalSearchParams();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>Day: {day}</Text>
                {/* TODO: make 4 pages in a carousel that you can slide between, one for each element.  */}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({

})