import z from "zod";

export const schema = z.object({
  attachment: z.array(z.string()),
  name: z
    .string({ error: "Product name is required." })
    .min(3, "Product has to have at least 3 letters in name!"),
  price: z
    .number({ message: "Price value is required!" })
    .min(1, { message: "Price cannot be below 1zł" }),
  stockLimit: z.number(),
  brand: z.object({ label: z.string(), value: z.number() }),
  category: z.object({ label: z.string(), value: z.number() }),
});
