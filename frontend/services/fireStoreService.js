import { db } from "@/config/firebaseConfig";
import { Collections, JobStatus, JobType } from "@/constants";
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

const firestoreService = {
  createJob: async (userId, jobData) => {
    try {
      const jobRef = doc(collection(db, Collections.JOBS));
      const job = {
        id: jobRef.id,
        userId,
        type: jobData.type || JobType.LOGO,
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

  createLogo: async (logoData) => {
    try {
      const logoRef = doc(collection(db, Collections.LOGOS));
      const logo = {
        id: logoRef.id,
        jobId: logoData.jobId,
        userId: logoData.userId,
        prompt: logoData.prompt,
        style: logoData.style,
        storageUrl: logoData.storageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(logoRef, logo);
      console.log("Logo created with ID:", logoRef.id);
      return logoRef.id;
    } catch (error) {
      console.error("Error creating logo:", error);
      throw error;
    }
  },

  getUserLogos: async (userId, limitCount = 20) => {
    try {
      const q = query(
        collection(db, Collections.LOGOS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limitCount),
      );

      const querySnapshot = await getDocs(q);
      const logos = [];
      querySnapshot.forEach((doc) => {
        logos.push({ id: doc.id, ...doc.data() });
      });

      return logos;
    } catch (error) {
      console.error("Error getting user logos:", error);
      throw error;
    }
  },

  getLogo: async (logoId) => {
    try {
      const logoRef = doc(db, Collections.LOGOS, logoId);
      const logoSnap = await getDoc(logoRef);

      if (logoSnap.exists()) {
        return { id: logoSnap.id, ...logoSnap.data() };
      } else {
        throw new Error("Logo not found");
      }
    } catch (error) {
      console.error("Error getting logo:", error);
      throw error;
    }
  },

  getLogoByJobId: async (jobId) => {
    try {
      const q = query(collection(db, Collections.LOGOS), where("jobId", "==", jobId), limit(1));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error("Logo not found for this job");
      }
    } catch (error) {
      console.error("Error getting logo by job ID:", error);
      throw error;
    }
  },
};

export default firestoreService;
