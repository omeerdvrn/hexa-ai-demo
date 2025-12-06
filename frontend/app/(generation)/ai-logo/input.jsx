import CreateButton from "./_components/CreateButton";
import LogoStyleSelector from "./_components/LogoStyleSelector";
import PromptInput from "./_components/PromptInput";

import { Keyboard, Pressable, StyleSheet } from "react-native";
const InputScreen = () => {
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <PromptInput />
      <LogoStyleSelector />
      <CreateButton />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: "95%",
  },
});

export default InputScreen;
