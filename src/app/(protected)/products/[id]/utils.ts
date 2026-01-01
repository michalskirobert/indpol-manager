import { getInit } from "@/app/layout";
import { DictionaryTypes } from "@/types/dictionaries";

export function findDictionaryName(
  init: ReturnType<typeof getInit>,
  type: DictionaryTypes,
  value?: string,
) {
  if (!value) return "";
  return (
    init.dictionaries.find(
      ({ value: dictValue, dictionaryId }) =>
        dictionaryId === type && dictValue === value,
    )?.name.en || ""
  );
}
