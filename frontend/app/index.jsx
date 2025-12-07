import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <>
        <StatusBar style="auto" hidden={false}></StatusBar>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>Initializing...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar style="auto" hidden={false}></StatusBar>
      <Redirect href="ai-logo" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
