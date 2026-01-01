import { Control } from "react-hook-form";
import { CustomForm } from "../shared/form";
import { Percent } from "lucide-react";
import { useInit } from "@/app/InitProvider";
import { DictionaryTypes } from "@/types/dictionaries";

export const useCreateForm = (control: Control<any>) => {
  const { dictionaries } = useInit();

  const brands = dictionaries.filter(
    ({ dictionaryId }) => dictionaryId === DictionaryTypes.Brands,
  );
  const categories = dictionaries.filter(
    ({ dictionaryId }) => dictionaryId === DictionaryTypes.Categories,
  );

  const generalSection = CustomForm({
    fields: [
      [
        {
          type: "attachment",
          inputAttachmentProps: { name: "images", control, size: { max: 5 } },
        },
      ],
      [
        {
          type: "input",
          inputProps: { control, name: "name", label: "Name", required: true },
        },
        {
          type: "input",
          inputProps: {
            control,
            min: 0,
            type: "number",
            label: "Price",
            name: "price",
            required: true,
          },
        },
        {
          type: "input",
          inputProps: {
            label: "Stock limit",
            min: 0,
            type: "number",
            control,
            name: "stockLimit",
            required: true,
          },
        },
        {
          type: "input",
          inputProps: {
            control,
            label: "Discount",
            name: "discount",
            min: 0,
            type: "number",
            icon: <Percent />,
          },
        },
      ],
      [
        {
          type: "textarea",
          textareaProps: {
            required: true,
            control,
            label: "Description PL",
            name: "desc.pl",
            rows: 3,
            resize: true,
          },
        },
      ],
      [
        {
          type: "textarea",
          textareaProps: {
            required: true,
            control,
            label: "Description EN",
            name: "desc.en",
            rows: 3,
            resize: true,
          },
        },
      ],
      [
        {
          type: "textarea",
          textareaProps: {
            required: true,
            control,
            label: "Description ID",
            name: "desc.id",
            rows: 3,
            resize: true,
          },
        },
      ],
      [
        {
          type: "select",
          inputSelectProps: {
            label: "Category",
            control,
            name: "category",
            required: true,
            options: categories.map(({ name, value }) => ({
              label: name.en,
              value,
            })),
          },
        },
        {
          type: "select",
          inputSelectProps: {
            label: "Brand",
            control,
            name: "brand",
            required: true,
            options: brands.map(({ name, value }) => ({
              label: name.en,
              value,
            })),
          },
        },
      ],
    ],
  });

  return { generalSection };
};
