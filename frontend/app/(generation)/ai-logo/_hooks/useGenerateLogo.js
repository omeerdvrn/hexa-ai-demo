import abstract from "@/assets/images/logo-styles/abstract.png";
import mascot from "@/assets/images/logo-styles/mascot.png";
import monogram from "@/assets/images/logo-styles/monogram.png";
import { useAuth } from "@/contexts/AuthContext";
import fireStoreService from "@/services/fireStoreService";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import ErrorIcon from "../_components/ErrorIcon";

const useGenerateLogo = () => {
  const [jobId, setJobId] = useState("");
  const [progressData, setProgressData] = useState({ status: "idle" });
  const [prompt, setPrompt] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState(0);
  const { createJob, subscribeToJob } = fireStoreService;
  const unsubscribeRef = useRef(null);

  const { userId } = useAuth();

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
      name: "No Style",
      image: null,
    },
    {
      id: 1,
      name: "Monogram",
      imageUrl: "",
      image: monogram,
    },
    {
      id: 2,
      name: "Abstract",
      imageUrl: "",
      image: abstract,
    },
    {
      id: 3,
      name: "Mascot",
      imageUrl: "",
      image: mascot,
    },
  ];

  // Cleanup subscription on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);

  const submitGenerateLogoRequest = async () => {
    if (true) {
      console.log(userId);
    }

    // Prevent creating a new job if there's already a processing job
    if (progressData.status === "processing") {
      Alert.alert("Please wait", "A job is already in progress. Please wait for it to complete.");
      return;
    }

    const jobData = {
      prompt,
      style: selectedStyleId,
    };

    try {
      // Clean up previous subscription if exists (only when creating a new job)
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }

      const newJobId = await createJob(userId, jobData);
      setJobId(newJobId);
      console.log(newJobId);

      // Subscribe to job updates
      unsubscribeRef.current = subscribeToJob(newJobId, (jobData, error) => {
        if (error) {
          setProgressData({ status: "failed" });
          return;
        }

        if (!jobData) {
          setProgressData({ status: "failed" });
          return;
        }

        // Update progress based on job status
        if (jobData.status === "completed") {
          setProgressData({
            jobId: newJobId,
            status: "completed",
            resultUrl: jobData.resultUrl,
          });
        } else if (jobData.status === "failed" || jobData.error) {
          setProgressData({ status: "failed" });
        } else {
          setProgressData({ status: "inProgress" });
        }
      });
    } catch (_err) {
      Alert.alert("Something went wrong!");
    }

    console.log("submit", {
      prompt,
      selectedStyleId,
    });
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
