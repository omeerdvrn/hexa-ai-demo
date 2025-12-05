import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: style.container }} />;
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
