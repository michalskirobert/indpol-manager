export type LanguageCode = "pl" | "id" | "en";
export type LanguageLabel = "Polski" | "English" | "Bahasa";

export enum ProductStatus {
  Draft = 10,
  Published = 20,
  Withdraw = 30,
}

export interface DetailProps {
  id: string;
  title: { [key in LanguageCode]: string };
  detail: { [key in LanguageCode]: string };
}

export interface ProductProps {
  _id?: string;
  desc: { [key in LanguageCode]: string };
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
  variants?: string[];
  stockLimit: number;
  status?: ProductStatus;
  createdDate?: string | null;
  updatedDate?: string | null;
}
