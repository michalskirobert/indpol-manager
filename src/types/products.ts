export type languageCode = "pl" | "id" | "en";
export type languageLabel = "Polski" | "English" | "Bahasa";

export enum ProductStatus {
  Draft = 10,
  Published = 20,
  Withdraw = 30,
}

export interface VariantsDocument {
  imageUrl: string;
  productId: string;
  productUrl: string;
  name: string;
}

export interface DetailProps {
  id: string;
  title: { [key in languageCode]: string };
  detail: { [key in languageCode]: string };
}

export interface ProductProps {
  _id?: string;
  desc: { [key in languageCode]: string };
  name: string;
  category: string;
  brand: string;
  images: string[];
  price: number;
  details: DetailProps[];
  discount?: number;
  purchased?: boolean;
  quantity?: number;
  productId?: string;
  variants?: VariantsDocument[];
  stockLimit: number;
  status?: ProductStatus;
  createdDate?: string | null;
  updatedDate?: string | null;
}
