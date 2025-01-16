import { FC } from "react";
import { useForm } from "react-hook-form";

interface Props {
  onClose: () => void;
}

export const LoginForm: FC<Props> = ({ onClose }) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return <div></div>;
};
