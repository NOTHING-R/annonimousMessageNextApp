import {z} from "zod";


export const signInSchema = z.object({
  indentifire: z.string(),
  password: z.string()
})
