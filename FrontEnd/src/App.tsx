import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { check } from "./api/auth";
import { setAuth } from "./features/auth/redux/authSlice";
import { Spinner } from "./components/ui/spinner";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();

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
