import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loading.json";

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="text-center">
        <div className="w-48 h-48 mx-auto mb-6">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
        <p className="text-[#0E3B3B] font-semibold text-lg">
          Initializing Clinical Decision Engine...
        </p>
        <div className="mt-4 flex gap-1 justify-center">
          <div className="w-2 h-2 bg-[#1FAF9A] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#1FAF9A] rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-[#1FAF9A] rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
