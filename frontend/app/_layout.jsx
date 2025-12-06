import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{ statusBarHidden: false, headerShown: false, contentStyle: style.container }}
    ></Stack>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
