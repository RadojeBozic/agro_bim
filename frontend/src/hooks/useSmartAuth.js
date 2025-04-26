import { useEffect, useState } from "react";
import { getSmartUser } from "../helpers/authSmart";

export default function useSmartAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSmartUser()
      .then(res => {
        setUser(res);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { user, loading, isLoggedIn: !!user };
}
