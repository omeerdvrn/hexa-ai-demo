import CreateButton from "./_components/CreateButton";
import GenerationStatusChip from "./_components/GenerationStatusChip";
import LogoStyleSelector from "./_components/LogoStyleSelector";
import PromptInput from "./_components/PromptInput";

import { Keyboard, Pressable, StyleSheet } from "react-native";
const InputScreen = () => {
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <GenerationStatusChip />
      <PromptInput />
      <LogoStyleSelector />
      <CreateButton />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: "95%",
  },
});

export default InputScreen;
