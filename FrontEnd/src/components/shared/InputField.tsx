import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import RequiredError from "./RequiredError";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { HTMLInputTypeAttribute } from "react";

type InputFieldProps = {
  id: string;
  label: string;
  register: ReturnType<any>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  type: HTMLInputTypeAttribute;
  placeholder?: string | undefined;
  step?: string | number | undefined;
};

const InputField = ({
  id,
  label,
  register,
  error,
  placeholder,
  type = "text",
  step,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        step={step}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <RequiredError msg={error as string} />}
    </div>
  );
};

export default InputField;
