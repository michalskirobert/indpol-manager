import z from "zod";

const numberFromInput = z
  .union([z.string(), z.number()])
  .transform((val) => {
    if (val === "" || val === null || val === undefined) return 0;
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  })
  .pipe(z.number());

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters long."),
  price: numberFromInput.refine((val) => val >= 1, {
    error: "Price must be at least 1.",
  }),
  stockLimit: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== null && val !== undefined, {
      error: "Please enter the stock quantity.",
    })
    .transform((val) => Number(val))
    .pipe(z.number().min(0, { error: "Stock cannot be negative." })),
  brand: z.string(),
  category: z.string(),
  desc: z.object({
    id: z.string().trim().min(1, "Indonesian description is required!"),
    en: z.string().trim().min(1, "English description is required!"),
    pl: z.string().trim().min(1, "Polish description is required!"),
  }),
  details: z.array(z.any()).min(1, "Please add at least one variant."),
  discount: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return 0;
      const num = Number(val);
      return Number.isNaN(num) ? 0 : num;
    })
    .pipe(z.number().min(0, { error: "Discount cannot be negative." }))
    .optional(),
  images: z
    .array(z.string())
    .min(1, "Product needs to have at least one picture"),
  status: z.number().optional(),
});
