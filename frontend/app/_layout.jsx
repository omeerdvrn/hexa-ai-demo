import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import defaultTheme from "@/theme";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            statusBarHidden: false,
            headerShown: false,
            contentStyle: styles.container,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultTheme.colors.background.primary,
  },
});
