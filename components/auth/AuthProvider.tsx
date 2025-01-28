import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/slices/user";
import Layout from "@/components/layout/Layout";
import Loading from "@/components/ui/Loading";
import { hasError, isEmptyData, isValid } from "@/helpers/api/status";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/getToken");
      const result = await res.json();
      if (isValid(result)) {
        setUserData();
        setIsAuthenticated(result.status);
      }
      setIsLoading(false);
    };

    const setUserData = async () => {
      const res = await fetch("/api/member/getProfile");
      const result = await res.json();
      const isUnSuccessful = hasError(result) || isEmptyData(result);
      if (isUnSuccessful) {
        setIsAuthenticated(false);
        return;
      }
      dispatch(setUser(result.data));
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isAdminPage) {
    return <>{children}</>;
  }

  return <Layout isAuthenticated={isAuthenticated}>{children}</Layout>;
}
