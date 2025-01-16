import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Enter correct email" }),
  password: z.string().min(6, { message: "Must be at least 6 charachters" }),
});
