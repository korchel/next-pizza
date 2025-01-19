import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { loginSchema, TLoginValues } from "./schemas";
import { Button } from "@/components/ui";
import { FormInput } from "../../form";
import { Title } from "../../Title";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  close: () => void;
}

export const LoginForm: FC<Props> = ({ close }) => {
  const form = useForm<TLoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginValues) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!response?.ok) {
        throw Error();
      }
      toast.success("Logged in", {
        icon: "✅",
      });
      close();
    } catch (error) {
      console.error("LOGIN ERROR", error);
      toast.error("Login failed", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/assets/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Enter
        </Button>
      </form>
    </FormProvider>
  );
};
