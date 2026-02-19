import Lottie from "lottie-react";
import loading from "../../assets/animations/loading.json";

const ButtonLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <Lottie animationData={loading} loop={true} className="w-48 h-48" />
    </div>
  );
};

export default ButtonLoader;
