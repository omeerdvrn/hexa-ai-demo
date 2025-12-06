import { useState } from "react";

const usePromptInput = () => {
  const [focused, setFocused] = useState(false);
  const [prompt, setPrompt] = useState("");

  return {
    focused,
    setFocused,
    prompt,
    setPrompt,
  };
};

export default usePromptInput;
