import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput } from "react-native";
const InputScreen = () => {
  const [prompt, setPrompt] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Text style={styles.promptLabel}>Enter Your Prompt</Text>
      <LinearGradient
        colors={["#2938DC", "#943DFF"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.25, y: 0 }}
        locations={[1, 0.25]}
        style={styles.gradientBackground}
      >
        <TextInput
          style={[styles.input, inputFocused && styles.inputFocused]}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="A blue lion logo reading 'HEXA' in bold letters"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          multiline
        />

        <Text style={styles.charCount}>{prompt.length}/500</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: "90%",
  },
  promptLabel: {
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
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 16,
    position: "relative",
    zIndex: 2,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 16,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    height: 175,
  },
  inputFocused: {
    borderWidth: "1",
    borderColor: "white",
  },
  charCount: {
    position: "absolute",
    bottom: 12,
    left: 16,
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 12,
  },
  logoStylesContainer: {
    marginTop: 10,
    backgroundColor: "gray",
  },
  logoStylesLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    marginTop: 12,
  },
});

export default InputScreen;
