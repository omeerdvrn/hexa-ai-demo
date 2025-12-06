import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          statusBarHidden: false,
          headerShown: false,
          contentStyle: style.container,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </AuthProvider>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
});
