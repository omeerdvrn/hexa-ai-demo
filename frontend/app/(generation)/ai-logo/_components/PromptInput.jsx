import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
const PromptInput = ({ prompt, setPrompt }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <Text style={styles.promptLabel}>Enter Your Prompt</Text>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="A blue lion logo reading 'HEXA' in bold letters"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline
        autoCorrect={false}
        returnKeyType="done"
        submitBehavior="blurAndSubmit"
      />

      <Text style={styles.charCount}>{prompt.length}/500</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  input: {
    color: "#FFFFFF",
    fontSize: 16,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    height: 175,
    backgroundColor: "#2A2834",
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
});

export default PromptInput;
