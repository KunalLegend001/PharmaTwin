import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { resetAuth } from "@/features/auth/redux/authSlice";
import { persist } from "@/app/store";
import { toast } from "sonner";
import { profile } from "@/api/user";
import { useEffect } from "react";
import { resetUser, setUser } from "@/app/reducers/userSlice";
import { setToggle } from "@/app/reducers/sidebarSlice";
import {
  Home,
  LogoutCurve,
  User,
} from "iconsax-reactjs";
import { 
  ScanText, 
  MessageSquareCheck, 
  History 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import IconCircle from "@/components/shared/IconCircle";

const Sidebar = () => {
  const toggle = useSelector((state: any) => state.sidebar.toggle);

  const dispatch = useDispatch();

  const { data, isFetched } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    retry: true,
  });

  useEffect(() => {
    if (isFetched && data && data.user) {
      dispatch(setUser(data.user));
    }
  }, [isFetched, data, dispatch]);

  return (
    <Card
      className={`fixed lg:static lg:translate-x-0 w-[80%] z-50 rounded-l-none rounded-br-none sm:w-[45%] md:w-[40%] lg:w-[35%] xl:w-[30%] h-screen py-4 pl-4 pr-2 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        toggle ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-4 flex-1 overflow-hidden">
        <SidebarHeader />
        <Separator />
        <SidebarContent />
      </div>

      <SidebarFooter />
    </Card>
  );
};

export default Sidebar;

const SidebarHeader = () => {
  return (
    <div className="flex items-center">
      <Logo className="size-10" />
    </div>
  );
};

const SidebarContent = () => {
  const { t } = useTranslation("sidebar");

  const navLinks = [
    { title: t("home"), icon: Home, to: "/" },
    { title: t("analysis"), icon: ScanText, to: "/analysis" },
    { title: t("support"), icon: MessageSquareCheck, to: "/support" },
    { title: t("history"), icon: History, to: "/history" },
  ];

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(setToggle());
  };

  return (
    <div
      onClick={onClickHandler}
      className="flex-1 overflow-y-auto flex flex-col gap-2"
    >
      {navLinks.map((item, index) => (
        <NavLink key={index} icon={item.icon} title={item.title} to={item.to} />
      ))}
    </div>
  );
};

const NavLink = ({
  title,
  icon: Icon,
  to,
}: {
  title: string;
  icon: any;
  to: string;
}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"ghost"}
      className="w-full p-4 flex gap-2 items-center justify-start"
      onClick={() => navigate(to)}
    >
      <Icon className="h-5! w-5!" />
      {title}
    </Button>
  );
};

const SidebarFooter = () => {
  const auth = useSelector((state: any) => state.auth.auth);

  const user = useSelector((state: any) => state.user.user);

  const navigate = useNavigate();

  return (
    <div>
      {auth ? (
        <div className="w-full px-0 pl-1 pr-2 py-2 self-bottom hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 justify-between inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
          <div className="flex gap-2">
            <IconCircle icon={<User />} size="w-10 h-10"></IconCircle>
            <div className="flex flex-col justify-center items-start">
              <div className="font-bold">{user.name ?? "loading..."}</div>
              <div>{user.email ?? "loading..."}</div>
            </div>
          </div>
          <Dropdown />
        </div>
      ) : (
        <div className="self-bottom p-2">
          <div className="flex flex-row justify-center gap-2 items-center">
            <Button
              className="w-1/2"
              variant={"outline"}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
            <Button
              className="text-[#fafafa] w-1/2"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Dropdown = (props: React.SVGProps<SVGSVGElement>) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data: any) => {
      dispatch(resetAuth());
      persist.purge();

      navigate("/");
      toast.success(data.msg);
    },
  });

  const logoutHandler = () => {
    logoutMutation.mutate();
    dispatch(resetUser());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={logoutHandler} variant="destructive">
          <LogoutCurve size="32" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
