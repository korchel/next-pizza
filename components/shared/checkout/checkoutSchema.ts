import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: "Не менее 2 символов" }),
  lastName: z.string().min(2, { message: "Не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный e-mail" }),
  phone: z.string().min(10, { message: "Введите корректный номер" }),
  address: z.string().min(5, { message: "Введите корректный адрес" }),
  comment: z.string().optional(),
});

export type CheckoutFormType = z.infer<typeof checkoutSchema>;
