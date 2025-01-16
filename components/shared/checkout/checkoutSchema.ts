import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: "At least 2 characters" }),
  lastName: z.string().min(2, { message: "At least 2 characters" }),
  email: z.string().email({ message: "Enter correct e-mail" }),
  phone: z.string().min(10, { message: "Enter correct phone number" }),
  address: z.string().min(5, { message: "Enter correct address" }),
  comment: z.string().optional(),
});

export type CheckoutFormType = z.infer<typeof checkoutSchema>;
