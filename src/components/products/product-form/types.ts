import z from "zod";
import { schema } from "./schema";

export type ProductFormInput = z.input<typeof schema>;
export type ProductFormValues = z.output<typeof schema>;
