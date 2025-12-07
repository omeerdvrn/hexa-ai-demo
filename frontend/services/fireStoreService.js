import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Collections, JobStatus } from "../constants";

const firestoreService = {
  createJob: async (userId, jobData) => {
    try {
      const jobRef = doc(collection(db, Collections.JOBS));
      const job = {
        id: jobRef.id,
        userId,
        status: JobStatus.PROCESSING,
        prompt: jobData.prompt,
        style: jobData.style || 0,
        seen: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        resultUrl: null,
        error: null,
      };

      await setDoc(jobRef, job);
      console.log("Job created with ID:", jobRef.id);
      return jobRef.id;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },
  getJob: async (jobId) => {
    try {
      const jobRef = doc(db, Collections.JOBS, jobId);
      const jobSnap = await getDoc(jobRef);

      if (jobSnap.exists()) {
        return { id: jobSnap.id, ...jobSnap.data() };
      } else {
        throw new Error("Job not found");
      }
    } catch (error) {
      console.error("Error getting job:", error);
      throw error;
    }
  },

  getUserJobs: async (userId, limitCount = 10) => {
    try {
      const q = query(
        collection(db, Collections.JOBS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limitCount),
      );

      const querySnapshot = await getDocs(q);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });

      return jobs;
    } catch (error) {
      console.error("Error getting user jobs:", error);
      throw error;
    }
  },

  subscribeToJob: (jobId, callback) => {
    const jobRef = doc(db, Collections.JOBS, jobId);

    const unsubscribe = onSnapshot(
      jobRef,
      (doc) => {
        if (doc.exists()) {
          callback({ id: doc.id, ...doc.data() });
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error("Error listening to job updates:", error);
        callback(null, error);
      },
    );

    return unsubscribe;
  },

  getLatestJob: async (userId) => {
    try {
      const q = query(
        collection(db, Collections.JOBS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(1),
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error("Error getting latest job:", error);
      throw error;
    }
  },

  markJobAsSeen: async (jobId) => {
    try {
      const jobRef = doc(db, Collections.JOBS, jobId);
      await updateDoc(jobRef, {
        seen: true,
        updatedAt: serverTimestamp(),
      });
      console.log("Job marked as seen:", jobId);
    } catch (error) {
      console.error("Error marking job as seen:", error);
      throw error;
    }
  },
};

export default firestoreService;
