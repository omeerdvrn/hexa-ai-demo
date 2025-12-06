import gradient from "@/assets/images/background/gradient.png";
import { Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
const GenerationImageLayout = () => {
  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: "black" }}
      source={gradient}
      resizeMode="cover"
    >
      <Stack
        initialRouteName="input"
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          title: "AI Logo",
          headerStyle: {
            backgroundColor: "transparent",
            border: "none",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "800",
          },
          contentStyle: style.container,
        }}
      />
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});

export default GenerationImageLayout;
