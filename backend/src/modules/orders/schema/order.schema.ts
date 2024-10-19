import { z } from "zod";

export const orderSchema = z
  .object({
    id: z.array(z.string()),
  })
  .strict();  

export type orderInsertType = z.infer<typeof orderSchema>;
