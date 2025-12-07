import abstract from "@/assets/images/logo-styles/abstract.png";
import mascot from "@/assets/images/logo-styles/mascot.png";
import monogram from "@/assets/images/logo-styles/monogram.png";
import { useAuth } from "@/contexts/AuthContext";
import fireStoreService from "@/services/fireStoreService";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import {
  ACTIVE_JOB_STATUSES,
  JOB_STATUS_CONFIG,
  JobStatus,
  LogoStyleName,
} from "../../../../constants";

const useGenerateLogo = () => {
  const [jobId, setJobId] = useState("");
  const [progressData, setProgressData] = useState({ status: JobStatus.IDLE });
  const [prompt, setPrompt] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState(0);
  const { createJob, subscribeToJob, getLatestJob } = fireStoreService;
  const unsubscribeRef = useRef(null);

  const { userId } = useAuth();

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

  const retrySubmitGenerateLogoRequest = async () => {
    const lastJob = await getLatestJob(userId);

    const jobData = {
      prompt: lastJob.prompt,
      style: lastJob.style,
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

  const submitGenerateLogoRequest = useCallback(async () => {
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
  }, [progressData.status, prompt, selectedStyleId, userId, createJob, subscribeToJob]);

  useEffect(() => {
    const checkForUnseenJob = async () => {
      if (!userId) return;

      try {
        const latestJob = await getLatestJob(userId);
        if (latestJob && !latestJob.seen) {
          setJobId(latestJob.id);
          setProgressData({
            jobId: latestJob.id,
            status: latestJob.status,
            resultUrl: latestJob.resultUrl,
            error: latestJob.error,
            seen: latestJob.seen,
          });

          if (ACTIVE_JOB_STATUSES.some((s) => s === latestJob.status)) {
            unsubscribeRef.current = subscribeToJob(latestJob.id, (jobData, error) => {
              if (!jobData || error) {
                setProgressData({ status: JobStatus.FAILED });
                return;
              }

              setProgressData({
                jobId: latestJob.id,
                ...jobData,
              });
            });
          }
        }
      } catch (error) {
        console.error("Error checking for unseen job:", error);
      }
    };

    checkForUnseenJob();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [userId, getLatestJob, subscribeToJob]);

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
