"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import { registerSchema, TRegisterValues } from "./modals/authModal/schemas";
import { User } from "@prisma/client";
import { Button, Title, Container } from "../ui";
import { FormInput } from "./form";
import { updateUserInfo } from "@/app/actions";

interface Props {
  user: User;
}

export const ProfileForm: FC<Props> = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: TRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("Данные обновлены 📝", {
        icon: "✅",
      });
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при обновлении данных", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Личные данные | #${user.id}`}
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput
            type="password"
            name="password"
            label="Новый пароль"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторите пароль"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
