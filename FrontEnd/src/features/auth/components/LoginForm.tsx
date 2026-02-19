import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/api/auth";
import FadeInUpWrapper from "@/components/shared/FadeInWrapper";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RequiredError from "@/components/shared/RequiredError";
import InputField from "@/components/shared/InputField";
import TButton from "@/components/shared/TButton";
import MyLink from "./shared/MyLink";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/reducers/userSlice";
import { setAuth } from "../redux/authSlice";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const { t } = useTranslation("auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setAuth(data.success));
      dispatch(setUser(data.user));
      navigate("/");

      toast.success(t("loginSuccess"));
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.msg);
    },
  });

  const loginHandler = (data: any) => {
    const email: string = data.email as string;
    const password: string = data.password as string;
    console.log("LOGIN HANDLER DATA:", data);
    mutate({ email, password });
  };

  return (
    <FadeInUpWrapper delay={0.5}>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("loginTitle")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("loginSubtitle")}
          </p>
        </div>

        <div className="grid gap-6">
          <InputField
            id="email"
            type="email"
            label={t("email")}
            placeholder="m@example.com"
            register={register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("invalidEmail"),
              },
            })}
            error={errors.email?.message}
          />

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">{t("password")}</Label>
              <MyLink
                className="ml-auto text-sm underline-offset-4 hover:underline"
                label={t("forgotPassword")}
                to="#"
              />
            </div>
            <Input
              {...register("password", {
                required: t("passwordRequired"),
              })}
              id="password"
              type="password"
            />
            {errors.password && (
              <RequiredError msg={errors.password.message as string} />
            )}
          </div>

          <TButton isPending={isPending} label={t("login")} />
        </div>

        <div className="text-center text-sm">
          {t("noAccount")} <MyLink label={t("goToSignup")} to="/signup" />
        </div>
      </form>
    </FadeInUpWrapper>
  );
};

export default LoginForm;
