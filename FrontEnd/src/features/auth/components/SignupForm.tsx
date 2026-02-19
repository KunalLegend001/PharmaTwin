import { signup } from "@/api/auth";
import FadeInUpWrapper from "@/components/shared/FadeInWrapper";
import InputField from "@/components/shared/InputField";
import { setAuth } from "@/features/auth/redux/authSlice";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TButton from "@/components/shared/TButton";
import MyLink from "./shared/MyLink";
import type { User2 } from "@/types/auth";

const SignupForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const { t } = useTranslation("auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(t("signupSuccess"));
      dispatch(setAuth(data.success));
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.msg);
    },
  });

  const signupHandler = (data: any) => {
    const { name, email, password, phone }: User2 = data;
    mutate({ name, email, password, phone });
  };

  return (
    <FadeInUpWrapper delay={0.5}>
      <form
        onSubmit={handleSubmit(signupHandler)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("signupTitle")}</h1>
        </div>

        <div className="grid gap-4">
          <InputField
            id="name"
            type="text"
            label={t("name")}
            register={register("name", {
              required: t("nameRequired"),
            })}
            error={errors.name?.message}
          />

          <InputField
            id="phone"
            type="text"
            label={t("phone")}
            register={register("phone", {
              required: t("phoneRequired"),
            })}
            placeholder="+91 XXXXXXXXXX"
            error={errors.phone?.message}
          />

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

          <InputField
            id="password"
            type="password"
            label={t("password")}
            register={register("password", {
              required: t("passwordRequired"),
              minLength: {
                value: 4,
                message: t("passwordMin"),
              },
            })}
            error={errors.name?.message}
          />

          <TButton isPending={isPending} label={t("signup")} />
        </div>

        <div className="text-center text-sm">
          {t("haveAccount")} <MyLink label={t("goToLogin")} to="/login" />
        </div>
      </form>
    </FadeInUpWrapper>
  );
};

export default SignupForm;
