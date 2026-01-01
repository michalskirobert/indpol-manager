import { ObjectId } from "mongodb";
import { languageCode } from "./products";

export type DictionaryParams = {
  _id: ObjectId;
  name: Record<languageCode, string>;
  desc: Record<languageCode, string>;
  value: string;
  dictionaryId: number;
};

export enum DictionaryTypes {
  Categories = 1,
  Brands = 2,
}
