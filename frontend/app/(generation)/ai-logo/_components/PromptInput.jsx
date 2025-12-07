import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
const PromptInput = ({ prompt, setPrompt, lengthLimit }) => {
  const [focused, setFocused] = useState(false);

  const setPromptWithLengthLimit = (newPrompt) => {
    if (newPrompt.length <= lengthLimit) {
      setPrompt(newPrompt);
    }
  };

  return (
    <View>
      <Text style={styles.promptLabel}>Enter Your Prompt</Text>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={prompt}
        onChangeText={setPromptWithLengthLimit}
        placeholder="A blue lion logo reading 'HEXA' in bold letters"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline
        autoCorrect={false}
        returnKeyType="done"
        submitBehavior="blurAndSubmit"
      />

      <Text style={styles.charCount}>
        {prompt.length}/{lengthLimit}
      </Text>
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
    minHeight: 175,
    textAlignVertical: "top",
    height: "auto",
    backgroundColor: "#2A2834",
    paddingBottom: 28,
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
