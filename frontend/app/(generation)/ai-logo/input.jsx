import { Keyboard, Pressable, StyleSheet } from "react-native";
import CreateButton from "./_components/CreateButton";
import GenerationStatusChip from "./_components/GenerationStatusChip";
import LogoStyleSelector from "./_components/LogoStyleSelector";
import PromptInput from "./_components/PromptInput";
import useGenerateLogo from "./_hooks/useGenerateLogo";

const InputScreen = () => {
  const {
    progressData,
    prompt,
    setPrompt,
    selectedStyleId,
    setSelectedStyleId,
    data,
    styleOptions,
    submitGenerateLogoRequest,
  } = useGenerateLogo();
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      {progressData.status !== "idle" && (
        <GenerationStatusChip data={data} progressData={progressData} />
      )}
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      <LogoStyleSelector
        selectedStyleId={selectedStyleId}
        setSelectedStyleId={setSelectedStyleId}
        options={styleOptions}
      />
      <CreateButton onPress={submitGenerateLogoRequest} />
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
