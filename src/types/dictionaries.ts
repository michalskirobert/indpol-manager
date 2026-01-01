import { LanguageCode } from "./products";

export type DictionaryParams = {
  _id: string;
  name: Record<LanguageCode, string>;
  desc: Record<LanguageCode, string>;
  value: string;
  dictionaryId: number;
};

export enum DictionaryTypes {
  Categories = 1,
  Brands = 2,
}
