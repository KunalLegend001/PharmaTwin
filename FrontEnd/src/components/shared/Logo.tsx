import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <Link to={"/"} className="flex items-center font-medium mr-3">
    <div
      className={cn(
        "text-primary-foreground flex size-16 items-center justify-center rounded-md",
        className,
      )}
    >
      <img src={logo} alt="PharmaTwin Logo" className="rounded-full" />
    </div>
  </Link>
);

export default Logo;
