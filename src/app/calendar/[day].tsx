import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Carousel } from "react-native-reanimated-carousel";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Day() {
    const {width, height} = useWindowDimensions();
    let { day } = useLocalSearchParams<{day?: string}>();

    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Text>Day: {day}</Text>
                    <Carousel
                        data={["Air", "Water", "Earth", "Fire"]}
                        style={{ flex: 1 }}
                        renderItem={({ item, index }) => (
                            <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: index % 2 ? "#DCE7F7" : "#F5E7D3",
                            }}
                            >
                            <Text>{item}</Text>
                            </View>
                        )}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})