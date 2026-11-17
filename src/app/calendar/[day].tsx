import { router, useLocalSearchParams } from "expo-router";
import { BackHandler, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Carousel } from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import TextInput from "react-native-text-input-interactive";
import { File, Paths } from 'expo-file-system';
import { useEffect, useState } from "react";
import { BackgroundTimer } from 'react-native-nitro-bg-timer';

export default function Day() {
    const {width, height} = useWindowDimensions();
    let { day: dayNum } = useLocalSearchParams<{day?: string}>();
    const insets = useSafeAreaInsets();
    const [texts, setTexts] = useState(["", "", "", ""])
    const [loaded, setLoaded] = useState(false);
    let progressNum = 0;

    const bgColors = {
        "water":"#DCE7F7",
        "earth":"#e8ffd9",
        "fire":"#ffcdcd",
        "air":"#F5E7D3",
    }
    
    const files: File[] = [new File(Paths.cache, `day${dayNum}-water.txt`), new File(Paths.cache, `day${dayNum}-earth.txt`), new File(Paths.cache, `day${dayNum}-fire.txt`), new File(Paths.cache, `day${dayNum}-air.txt`)]
    
    useEffect(() => {
        let index = 0;
        for (const file of files) {
            if(!file.exists) {
                file.create();
            } else {
                texts[index] = file.textSync();
            }
            index++;
        }
        console.log(texts);
        setLoaded(true);
    }, [])

    useEffect(() => {
        const backAction = () => {
            files[Math.ceil(progressNum)].writeSync(texts[Math.ceil(progressNum)]);
            files[Math.floor(progressNum)].writeSync(texts[Math.floor(progressNum)]);
            console.log("wrote to file");
            router.back();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
        );

        return () => backHandler.remove();
    }, [progressNum, texts]);


    useEffect(() => {
        if (!loaded) return;
        // console.log("triggered");
        const saveTimer = BackgroundTimer.setTimeout(() => {
            files[Math.ceil(progressNum)].writeSync(texts[Math.ceil(progressNum)]);
            files[Math.floor(progressNum)].writeSync(texts[Math.floor(progressNum)]);
            // console.log(files);
            console.log("wrote to file");
        }, 1000);

        return () => BackgroundTimer.clearTimeout(saveTimer);
    }, [texts, loaded])

    // function textChanged(val: string) {
    //     setText(val);
    //     BackgroundTimer.clearTimeout(saveTimer);
    //     BackgroundTimer.setTimeout(() => {
    //         file.write(text);
    //     }, 3000)
    // }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={styles.container}>
                <Carousel
                    data={["Water", "Earth", "Fire", "Air"]}
                    style={{ flex: 1 }}
                    renderItem={({ item, index }) => ( //TODO:  make text different for each text box, save text to each element in each day, implement autosave
                        <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: index == 0 ? bgColors.water : index == 1 ? bgColors.earth : index == 2 ? bgColors.fire : bgColors.air,
                            paddingTop: insets.top,
                            paddingBottom: insets.bottom
                        }}
                        >
                        <Text style={styles.dayTitle}>Day: {dayNum}</Text> 
                        <Text>{item}</Text>
                        <TextInput
                            placeholder={"Log here..."}
                            placeholderTextColor={"#8a8a8a"}
                            editable={loaded}
                            multiline
                            onChangeText={changedText => {
                                const tempTexts = texts.map((ogText, i) => {
                                    if (i == index) {
                                        console.log("inserted new text");
                                        return changedText;
                                    } else {
                                        console.log("kept og text")
                                        return ogText;
                                    }
                                });
                                console.log("updated text var")
                                console.log(tempTexts)
                                setTexts(tempTexts);
                            }}
                            defaultValue={texts[index]}
                            numberOfLines={10}
                            style={{height: height/2, width: width*9/10, backgroundColor: '#FFF', borderRadius: 20, paddingLeft: 10
                            }}
                            textAlignVertical="top"
                            id={`${index}`}
                        />
                        </View>
                    )}
                    onProgressChange={(progress) => {progressNum = progress;}}
                />
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center'
    },
    dayTitle: {
        fontSize: 24,
    }
})