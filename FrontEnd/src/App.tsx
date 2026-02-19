import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { check } from "./api/auth";
import { setAuth } from "./features/auth/redux/authSlice";
import { Spinner } from "./components/ui/spinner";
import GlobalLoader from "./components/shared/GlobalLoader";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  const [showGlobalLoader, setShowGlobalLoader] = useState(true);

  // Auth check
  const { data: authData, isFetched: authFetched } = useQuery({
    queryKey: ["check"],
    queryFn: check,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (authFetched) {
      dispatch(setAuth(authData?.success ?? false));
    }
  }, [authFetched, authData, dispatch]);

  useEffect(() => {
    // Hide global loader after initial load
    const timer = setTimeout(() => {
      setShowGlobalLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showGlobalLoader) {
    return <GlobalLoader />;
  }

  if (!authFetched) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
