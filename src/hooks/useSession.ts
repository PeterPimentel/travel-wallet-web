import { useEffect, useState } from "react";

import { getSession } from "../service/auth";
import { getToken } from "../service/token";

const useSession = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = getToken();
    getSession(token)
      .then((res) => {
        setSession(res.user);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { session, error, loading };
};

export default useSession;
