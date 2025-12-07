import abstract from "@/assets/images/logo-styles/abstract.png";
import mascot from "@/assets/images/logo-styles/mascot.png";
import monogram from "@/assets/images/logo-styles/monogram.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import { JOB_STATUS_CONFIG, LogoStyleName } from "../../../../constants";
import useJobManager from "./useJobManager";

const useGenerateLogo = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState(0);

  const {
    jobId,
    progressData,
    setProgressData,
    createAndSubscribeToJob,
    retryLastJob,
    loadLatestUnseenJob,
    cleanupSubscription,
  } = useJobManager();

  const data = useMemo(() => {
    return {
      processing: {
        ...JOB_STATUS_CONFIG.processing,
        visualContent: null,
      },
      completed: {
        ...JOB_STATUS_CONFIG.completed,
        visualContent: progressData.resultUrl || null,
      },
      failed: {
        ...JOB_STATUS_CONFIG.failed,
        visualContent: null,
      },
    };
  }, [progressData.resultUrl]);

  const styleOptions = useMemo(
    () => [
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
    ],
    [],
  );

  const retrySubmitGenerateLogoRequest = useCallback(async () => {
    const newJobId = await retryLastJob();
    if (newJobId) {
      setPrompt("");
    }
  }, [retryLastJob]);

  const submitGenerateLogoRequest = useCallback(async () => {
    const jobData = {
      prompt,
      style: selectedStyleId,
    };

    const newJobId = await createAndSubscribeToJob(jobData);
    if (newJobId) {
      setPrompt("");
    }
  }, [prompt, selectedStyleId, createAndSubscribeToJob]);

  useEffect(() => {
    loadLatestUnseenJob();

    return cleanupSubscription;
  }, [loadLatestUnseenJob, cleanupSubscription]);

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
    retrySubmitGenerateLogoRequest,
    submitGenerateLogoRequest,
  };
};

export default useGenerateLogo;
