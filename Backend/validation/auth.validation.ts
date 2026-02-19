import { z } from "zod";

export const validateSignup = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  type: z.enum(["WATER_USER", "MUNICIPAL"]).default("WATER_USER"),
});

export const validateLogin = z.object({
  email: z.string(),
  password: z.string(),
});
