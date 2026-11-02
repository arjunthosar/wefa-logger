import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const gridData = [
  {title: '1', id: '1'},
  {title: '2', id: '2'},
  {title: '3', id: '3'},
  {title: '4', id: '4'},
  {title: '5', id: '5'},
  {title: '6', id: '6'},
  {title: '7', id: '7'},
  {title: '8', id: '8'},
  {title: '9', id: '9'},
  {title: '10', id: '10'},
  {title: '11', id: '11'},
  {title: '12', id: '12'},
  {title: '13', id: '13'},
  {title: '14', id: '14'},
  {title: '15', id: '15'},
  {title: '16', id: '16'},
  {title: '17', id: '17'},
  {title: '18', id: '18'},
  {title: '19', id: '19'},
  {title: '20', id: '20'},
  {title: '21', id: '21'},
  {title: '22', id: '22'},
  {title: '23', id: '23'},
  {title: '24', id: '24'},
  {title: '25', id: '25'},
  {title: '26', id: '26'},
  {title: '27', id: '27'},
  {title: '28', id: '28'},
  {title: '29', id: '29'},
  {title: '30', id: '30'},
  {title: '31', id: '31'},
  {title: '', id: '32'},
  {title: '', id: '33'},
  {title: '', id: '34'},
  {title: '', id: '35'},
];

type ItemProps = {title: string};
const router = useRouter();

function pressDay(day: number) {
  router.navigate(`/calendar/${day}`);
}

const Item = ({title}: ItemProps) => (
  <Pressable onPress={() => pressDay(parseInt(title))}>
    <View style={styles.item}>
      <Text style={[styles.itemText, {width: useWindowDimensions().width / 7 - 22}]}>{title}</Text>
    </View>
  </Pressable>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, {marginTop: useWindowDimensions().height / 12}]}>Calendar</Text>
      <FlatList
        data={gridData}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        numColumns={7}
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    height: 100,
    borderWidth: 1,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
  title: {
    fontSize: 48
  }
});

export default App;