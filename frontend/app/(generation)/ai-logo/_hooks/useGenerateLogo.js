import { useCallback, useEffect, useMemo, useState } from "react";
import { JOB_STATUS_CONFIG, LOGO_STYLE_OPTIONS } from "@/constants";
import { useJobManager } from "@/hooks";

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

  const styleOptions = LOGO_STYLE_OPTIONS;

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
