import { z } from "zod";

export const userSchema = z.object({
  title: z.string().min(5, "Minimum 5 karakter!"),
  desc: z.string().min(5, "Minimum 5 karakter!"),
  isFixed: z.boolean(),
  //   roles: z.array(z.string()),
  roles: z.string(),
});
