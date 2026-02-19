import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface MyLinkProps {
  to: string;
  label: string;
  className?: string;
}

const MyLink = ({ to, label, className }: MyLinkProps) => {
  return (
    <Link
      to={to}
      className={cn("underline underline-offset-4 font-medium", className)}
    >
      {label}
    </Link>
  );
};

export default MyLink;
