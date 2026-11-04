import { useRouter, type Href } from 'expo-router';
import { Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
        <SafeAreaView>
            {/* TODO: Make this into a home page. */}
            <Button title="Go to Calendar" onPress={() => router.navigate('/calendar' as Href)} />
        </SafeAreaView>
    </SafeAreaProvider>
  )
}