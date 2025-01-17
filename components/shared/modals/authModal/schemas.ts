import { z } from "zod";

const passwordSchema = z
  .string()
  .min(4, { message: "Введите корректный пароль" });

export const loginSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }),
  password: passwordSchema,
});

export const registerSchema = loginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TLoginValues = z.infer<typeof loginSchema>;
export type TRegisterValues = z.infer<typeof registerSchema>;
