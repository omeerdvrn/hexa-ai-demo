import { useTheme } from "@/contexts/ThemeContext";
import { createThemedStyles } from "@/utils/styleHelpers";
import { Keyboard, Pressable } from "react-native";
import { INACTIVE_JOB_STATUSES } from "../../../constants/jobStatus";
import CreateButton from "./_components/CreateButton";
import GenerationStatusChip from "./_components/GenerationStatusChip";
import LogoStyleSelector from "./_components/LogoStyleSelector";
import PromptInput from "./_components/PromptInput";
import useGenerateLogo from "./_hooks/useGenerateLogo";

const InputScreen = () => {
  const theme = useTheme();
  const styles = createThemedStyles(createStyles, theme);
  const {
    progressData,
    prompt,
    setPrompt,
    selectedStyleId,
    setSelectedStyleId,
    data,
    styleOptions,
    retrySubmitGenerateLogoRequest,
    submitGenerateLogoRequest,
  } = useGenerateLogo();

  const submit = () => {
    if (prompt && prompt.trim() !== "") {
      submitGenerateLogoRequest();
    }
  };
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      {!INACTIVE_JOB_STATUSES.includes(progressData.status) && (
        <GenerationStatusChip
          data={data}
          progressData={progressData}
          retryCallback={retrySubmitGenerateLogoRequest}
        />
      )}
      <PromptInput prompt={prompt} setPrompt={setPrompt} lengthLimit={500} />
      <LogoStyleSelector
        selectedStyleId={selectedStyleId}
        setSelectedStyleId={setSelectedStyleId}
        options={styleOptions}
      />
      <CreateButton onPress={submit} />
    </Pressable>
  );
};

const createStyles = (theme) => ({
  container: {
    ...theme.layout.container,
  },
});

export default InputScreen;
