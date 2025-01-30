import { z } from "zod";

const NewProductDTO = z
  .object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    quantity: z.number(),
    category: z.string(),
  })
  .strict();

const EditProductDTO = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    category: z.string().optional(),
  })
  .strict();

type IProduct = z.infer<typeof NewProductDTO>;

export { EditProductDTO, NewProductDTO, IProduct };
