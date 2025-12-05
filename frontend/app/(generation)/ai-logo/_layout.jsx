import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
const GenerationImageLayout = () => {
  return (
    <Stack
      initialRouteName="input"
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackVisible: false,
        title: "AI Logo",
        headerStyle: {
          backgroundColor: "black",
          border: "none",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "800",
        },
        contentStyle: style.container,
      }}
    >
      <Stack.Screen name="input" />
      <Stack.Screen name="output" />
    </Stack>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});

export default GenerationImageLayout;
