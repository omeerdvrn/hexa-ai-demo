import mascot from "@/assets/images/logo-styles/mascot.png";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import ErrorIcon from "../_components/ErrorIcon";

const useGenerateLogo = () => {
  const [progressData, setProgressData] = useState({ status: "inProgress" });

  const data = {
    inProgress: {
      title: "Creating Your Design...",
      message: "Ready in 2 minutes",
      messageColor: "#71717A",
      messageBackgroundColor: "#2D2935",
      visualContentType: "icon",
      visualContent: <ActivityIndicator size={"small"} color={"white"}></ActivityIndicator>,
      visualContentBackgroundColor: "#18181B",
    },
    completed: {
      title: "Your Design is Ready!",
      message: "Tap to see it.",
      messageColor: "#D4D4D8",
      messageBackgroundColor: "#2D2935",
      visualContentType: "image",
      visualContent: mascot,
      visualContentBackgroundColor: "transparent",
    },
    failed: {
      title: "Oops, something went wrong!",
      message: "Click to try again.",
      messageColor: "#D4D4D8",
      messageBackgroundColor: "#EF4444",
      visualContentType: "icon",
      visualContent: <ErrorIcon />,
      visualContentBackgroundColor: "#F37C7C",
    },
  };
  return {
    progressData,
    setProgressData,
    data,
  };
};

export default useGenerateLogo;
