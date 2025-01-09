import { ClearButton, ErrorText, Input, RequiredSymbol } from "@/components/ui";
import { FC, InputHTMLAttributes } from "react";

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
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md" {...props} />
        <ClearButton />
      </div>
      <ErrorText text="required" className="mt-2" />
    </div>
  );
};
