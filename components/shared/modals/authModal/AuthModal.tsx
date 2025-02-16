"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Button, Dialog } from "@/components/ui";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface Props {
  isOpen: boolean;
  close: () => void;
  className?: string;
}

export const AuthModal: FC<Props> = ({ isOpen, close }) => {
  const [formType, setFormType] = useState<"login" | "register">("login");

  const handleClose = () => {
    close();
  };

  const onSwitchType = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  return (
    <Dialog.Dialog open={isOpen} onOpenChange={handleClose}>
      <VisuallyHidden>
        <Dialog.DialogTitle>Вход в аккаунт или регистрация</Dialog.DialogTitle>
      </VisuallyHidden>
      <VisuallyHidden>
        <Dialog.DialogDescription>
          Вход в аккаунт или регистрация
        </Dialog.DialogDescription>
      </VisuallyHidden>
      <Dialog.DialogContent className="w-[400px] sm:w-[450px] bg-white p-10">
        {formType === "login" ? (
          <LoginForm close={handleClose} />
        ) : (
          <RegisterForm close={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHub
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
          {formType !== "login" ? "Войти" : "Зарегистрироваться"}
        </Button>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};
