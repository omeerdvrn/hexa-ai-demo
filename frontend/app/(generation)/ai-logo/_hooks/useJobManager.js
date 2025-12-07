import { useAuth } from "@/contexts/AuthContext";
import fireStoreService from "@/services/fireStoreService";
import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { ACTIVE_JOB_STATUSES, JobStatus } from "../../../../constants";

const useJobManager = () => {
  const [jobId, setJobId] = useState("");
  const [progressData, setProgressData] = useState({ status: JobStatus.IDLE });
  const { createJob, subscribeToJob, getLatestJob } = fireStoreService;
  const unsubscribeRef = useRef(null);
  const { userId } = useAuth();

  const cleanupSubscription = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  }, []);

  const handleJobUpdate = useCallback(
    (newJobId) => (jobData, error) => {
      if (!jobData || error) {
        setProgressData({ status: JobStatus.FAILED });
        return;
      }

      setProgressData({
        jobId: newJobId,
        ...jobData,
      });
    },
    [],
  );

  const createAndSubscribeToJob = useCallback(
    async (jobData) => {
      if (progressData.status === JobStatus.PROCESSING) {
        Alert.alert("Please wait", "A job is already in progress. Please wait for it to complete.");
        return null;
      }

      try {
        cleanupSubscription();

        const newJobId = await createJob(userId, jobData);
        setJobId(newJobId);

        unsubscribeRef.current = subscribeToJob(newJobId, handleJobUpdate(newJobId));

        return newJobId;
      } catch (error) {
        console.error("Error creating job:", error);
        Alert.alert("Something went wrong!");
        return null;
      }
    },
    [progressData.status, userId, createJob, subscribeToJob, cleanupSubscription, handleJobUpdate],
  );

  const retryLastJob = useCallback(async () => {
    try {
      const lastJob = await getLatestJob(userId);
      if (!lastJob) {
        Alert.alert("No previous job found");
        return null;
      }

      const jobData = {
        prompt: lastJob.prompt,
        style: lastJob.style,
      };

      return await createAndSubscribeToJob(jobData);
    } catch (error) {
      console.error("Error retrying job:", error);
      Alert.alert("Something went wrong!");
      return null;
    }
  }, [userId, getLatestJob, createAndSubscribeToJob]);

  const loadLatestUnseenJob = useCallback(async () => {
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
          unsubscribeRef.current = subscribeToJob(latestJob.id, handleJobUpdate(latestJob.id));
        }
      }
    } catch (error) {
      console.error("Error loading latest job:", error);
    }
  }, [userId, getLatestJob, subscribeToJob, handleJobUpdate]);

  return {
    jobId,
    progressData,
    setProgressData,
    createAndSubscribeToJob,
    retryLastJob,
    loadLatestUnseenJob,
    cleanupSubscription,
  };
};

export default useJobManager;
