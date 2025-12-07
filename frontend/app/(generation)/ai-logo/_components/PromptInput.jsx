import { useTheme } from "@/contexts/ThemeContext";
import { createThemedStyles } from "@/utils/styleHelpers";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { getRandomPrompt } from "../../../../constants";
const PromptInput = ({ prompt, setPrompt, lengthLimit }) => {
  const theme = useTheme();
  const styles = createThemedStyles(createStyles, theme);
  const [focused, setFocused] = useState(false);

  const setPromptWithLengthLimit = (newPrompt) => {
    if (newPrompt.length <= lengthLimit) {
      setPrompt(newPrompt);
    }
  };

  const surpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setPrompt(randomPrompt);
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.promptLabel}>Enter Your Prompt</Text>
        <TouchableOpacity onPress={surpriseMe}>
          <Text style={styles.surpriseMeText}>🎲 Surprise me</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={prompt}
        onChangeText={setPromptWithLengthLimit}
        placeholder="A blue lion logo reading 'HEXA' in bold letters"
        placeholderTextColor={theme.colors.text.placeholder}
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

const createStyles = (theme) => ({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: theme.spacing[3],
    alignItems: "center",
  },
  promptLabel: {
    color: theme.colors.text.primary,
    fontSize: theme.tokens.typography.fontSize.xl,
    fontWeight: theme.tokens.typography.fontWeight.extrabold,
  },
  surpriseMeText: {
    color: theme.colors.text.primary,
    fontSize: theme.tokens.typography.fontSize.sm,
    fontWeight: theme.tokens.typography.fontWeight.thin,
  },
  input: {
    ...theme.typography.body,
    ...theme.components.input.default,
    paddingBottom: theme.spacing[6] + theme.spacing[1],
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: theme.components.input.default.focusedBorderColor,
  },
  charCount: {
    position: "absolute",
    bottom: theme.spacing[3],
    left: theme.spacing[4],
    ...theme.typography.caption,
  },
});

export default PromptInput;
