import logo from "@/assets/logo2.png";
import { appName } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <Link to={"/"} className="flex items-center font-medium">
    <div
      className={cn(
        "text-primary-foreground flex size-16 items-center justify-center rounded-md",
        className,
      )}
    >
      <img src={logo} />
    </div>
    <span className="font-bold text-lg">{appName}</span>
  </Link>
);

export default Logo;
