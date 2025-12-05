import { useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const OutputScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text onPress={() => router.back()}>Back to Input</Text>
      <Text>Output</Text>
    </SafeAreaView>
  );
};

export default OutputScreen;
