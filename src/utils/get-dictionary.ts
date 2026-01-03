import { DictionaryParams, DictionaryTypes } from "@/types/dictionaries";

export const getDictionary = (
  type: "categories" | "brands",
  dictionaries: DictionaryParams[],
) => {
  const findDictionaryId =
    type === "categories" ? DictionaryTypes.Categories : DictionaryTypes.Brands;

  return dictionaries.filter(
    ({ dictionaryId }) => dictionaryId === findDictionaryId,
  );
};
