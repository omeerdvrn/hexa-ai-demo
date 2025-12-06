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
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const JOBS_COLLECTION = "jobs";

const firestoreService = {
  createJob: async (userId, jobData) => {
    try {
      const jobRef = doc(collection(db, JOBS_COLLECTION));
      const job = {
        id: jobRef.id,
        userId,
        status: "processing",
        prompt: jobData.prompt,
        style: jobData.style || "default",
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
      const jobRef = doc(db, JOBS_COLLECTION, jobId);
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
        collection(db, JOBS_COLLECTION),
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
    const jobRef = doc(db, JOBS_COLLECTION, jobId);

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
        collection(db, JOBS_COLLECTION),
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
};

export default firestoreService;
