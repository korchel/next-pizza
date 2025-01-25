"use client";

import { FC, InputHTMLAttributes, LegacyRef, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IMaskMixin } from "react-imask";

import { ClearButton, ErrorText, Input, RequiredSymbol } from "@/components/ui";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  placeholder: string;
  className?: string;
}

const MaskedStiledInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input {...props} ref={inputRef as LegacyRef<HTMLInputElement>} />
));

export const PhoneInput: FC<Props> = ({
  className,
  name,
  label,
  required,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const ref = useRef(null);
  const inputRef = useRef(null);

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
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <MaskedStiledInput
              {...field}
              value={field.value}
              ref={ref}
              unmask={false}
              inputRef={inputRef}
              mask="+{7}(000)000-00-00"
              className="h-12 text-md"
              onAccept={(value: string) => {
                field.onChange(value);
              }}
              placeholder={placeholder}
            />
          )}
        />

        {value && <ClearButton onClick={clear} />}
      </div>
      {error && <ErrorText text={error} className="mt-2" />}
    </div>
  );
};
