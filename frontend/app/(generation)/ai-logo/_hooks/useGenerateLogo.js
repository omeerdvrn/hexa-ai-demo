import abstract from "@/assets/images/logo-styles/abstract.png";
import mascot from "@/assets/images/logo-styles/mascot.png";
import monogram from "@/assets/images/logo-styles/monogram.png";
import { useAuth } from "@/contexts/AuthContext";
import fireStoreService from "@/services/fireStoreService";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { JobStatus, LogoStyleName } from "../../../../constants";
import ErrorIcon from "../_components/ErrorIcon";

const useGenerateLogo = () => {
  const [jobId, setJobId] = useState("");
  const [progressData, setProgressData] = useState({ status: JobStatus.IDLE });
  const [prompt, setPrompt] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState(0);
  const { createJob, subscribeToJob } = fireStoreService;
  const unsubscribeRef = useRef(null);

  const { userId } = useAuth();

  const data = {
    processing: {
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
      visualContent: progressData.resultUrl,
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

  const styleOptions = [
    {
      id: 0,
      name: LogoStyleName[0],
      image: null,
    },
    {
      id: 1,
      name: LogoStyleName[1],
      imageUrl: "",
      image: monogram,
    },
    {
      id: 2,
      name: LogoStyleName[2],
      imageUrl: "",
      image: abstract,
    },
    {
      id: 3,
      name: LogoStyleName[3],
      imageUrl: "",
      image: mascot,
    },
  ];

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);

  const submitGenerateLogoRequest = async () => {
    if (progressData.status === JobStatus.PROCESSING) {
      Alert.alert("Please wait", "A job is already in progress. Please wait for it to complete.");
      return;
    }

    const jobData = {
      prompt,
      style: selectedStyleId,
    };

    try {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }

      const newJobId = await createJob(userId, jobData);
      setJobId(newJobId);
      setPrompt("");

      unsubscribeRef.current = subscribeToJob(newJobId, (jobData, error) => {
        if (!jobData || error) {
          setProgressData({ status: JobStatus.FAILED });
          return;
        }

        setProgressData({
          jobId: newJobId,
          ...jobData,
        });
      });
    } catch (_err) {
      Alert.alert("Something went wrong!");
    }
  };
  return {
    jobId,
    progressData,
    setProgressData,
    prompt,
    setPrompt,
    selectedStyleId,
    setSelectedStyleId,
    data,
    styleOptions,
    submitGenerateLogoRequest,
  };
};

export default useGenerateLogo;
