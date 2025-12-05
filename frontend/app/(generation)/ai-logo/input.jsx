import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
const InputScreen = () => {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Your Prompt</Text>
      <LinearGradient
        colors={["#2938DC", "#943DFF"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.25, y: 0 }}
        locations={[1, 0.25]}
        style={styles.gradientBackground}
      >
        <View style={styles.darkOverlay}>
          <TextInput
            style={styles.input}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="A blue lion logo reading 'HEXA' in bold letters"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            multiline
          />

          <Text style={styles.charCount}>{prompt.length}/500</Text>
        </View>
      </LinearGradient>

      <Text style={styles.label} onPress={() => router.push("ai-logo/output")}>
        Output
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: "90%",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    marginTop: 12,
  },
  gradientBackground: {
    borderRadius: 16,
  },
  darkOverlay: {
    backgroundColor: "rgba(0,0,0,0.8)", // Gradient'in üzerine koyu katman
    borderRadius: 16,
    position: "relative",
    zIndex: 2,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    height: 175,
  },
  charCount: {
    position: "absolute",
    bottom: 12,
    left: 16,
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 12,
  },
});

export default InputScreen;
