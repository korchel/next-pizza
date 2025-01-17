import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
}

export const RegisterForm: FC<Props> = ({ className }) => {
  return <div className={cn(className)}></div>;
};
