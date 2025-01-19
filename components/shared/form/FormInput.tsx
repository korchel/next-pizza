"use client";

import { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { ClearButton, ErrorText, Input, RequiredSymbol } from "@/components/ui";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const error = errors[name]?.message as string;
  const clear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />
        {value && <ClearButton onClick={clear} />}
      </div>
      {error && <ErrorText text={error} className="mt-2" />}
    </div>
  );
};
