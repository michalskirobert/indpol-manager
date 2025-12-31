import { ProductFormInput } from "./types";

export const defaultValues: ProductFormInput = {
  brand: "",
  category: "",
  desc: { en: "", id: "", pl: "" },
  details: [],
  images: [],
  name: "",
  price: 0,
  stockLimit: 0,
  discount: 0,
};
