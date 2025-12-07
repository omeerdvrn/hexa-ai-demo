import { db } from "@/config/firebaseConfig";
import { Collections } from "@/constants";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";

const logoService = {
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
};

export default logoService;
