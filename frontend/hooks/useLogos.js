import { useAuth } from "@/contexts/AuthContext";
import { logoService } from "@/services";
import { useCallback, useEffect, useState } from "react";

const useLogos = (limitCount = 20) => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useAuth();
  const { getUserLogos, getLogo } = logoService;

  const fetchUserLogos = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const userLogos = await getUserLogos(userId, limitCount);
      setLogos(userLogos);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user logos:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, limitCount, getUserLogos]);

  const fetchLogo = useCallback(
    async (logoId) => {
      try {
        setError(null);
        const logo = await getLogo(logoId);
        return logo;
      } catch (err) {
        setError(err.message);
        console.error("Error fetching logo:", err);
        return null;
      }
    },
    [getLogo],
  );

  const refreshLogos = useCallback(() => {
    fetchUserLogos();
  }, [fetchUserLogos]);

  useEffect(() => {
    fetchUserLogos();
  }, [fetchUserLogos]);

  return {
    logos,
    loading,
    error,
    fetchLogo,
    refreshLogos,
  };
};

export default useLogos;
