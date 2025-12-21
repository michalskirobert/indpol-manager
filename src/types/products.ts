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
  _id: string;
  desc: { [key in languageCode]: string };
  fullname: string;
  name: string;
  categoryName: string;
  categoryValue: string;
  images?: string[];
  price: number;
  discount?: number;
  brandName: string;
  brandValue: string;
  purchased?: boolean;
  quantity: number;
  productId?: string;
  details: DetailProps[];
  variants?: VariantsDocument[];
  stockLimit: number;
  status?: ProductStatus;
  createdDate?: string | null;
  updatedDate?: string | null;
}
