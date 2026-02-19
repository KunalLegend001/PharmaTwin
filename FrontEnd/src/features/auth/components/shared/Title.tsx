import { Link } from "react-router-dom";
import logo from "@/assets/logo2.png";
import { appName } from "@/constants/constants";
import Language from "@/components/shared/Language";

const Title = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link to={"/"} className="flex items-center font-medium">
        <div className="text-primary-foreground flex size-16 items-center justify-center rounded-md">
          <img src={logo} />
        </div>
        <span className="font-bold text-lg">{appName}</span>
      </Link>
      <Language />
    </div>
  );
};

export default Title;
