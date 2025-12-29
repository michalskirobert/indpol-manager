import { Control } from "react-hook-form";
import { CustomForm } from "../shared/form";
import { Percent } from "lucide-react";

export const useCreateForm = (control: Control<any>) => {
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
            defaultValue: 0,
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
            defaultValue: 0,
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
          type: "select",
          inputSelectProps: {
            label: "Category",
            multi: true,
            control,
            name: "category",
            options: [
              { label: "test", value: "test2" },
              { label: "test2", value: "test3" },
            ],
          },
        },
        {
          type: "select",
          inputSelectProps: {
            label: "Brand",
            multi: true,
            control,
            name: "brand",
            options: [
              { label: "test", value: "test2" },
              { label: "test2", value: "test3" },
            ],
          },
        },
        {
          type: "select",
          inputSelectProps: {
            label: "Variant",
            multi: true,
            control,
            name: "variant",
            options: [
              { label: "test", value: "test2" },
              { label: "test2", value: "test3" },
            ],
          },
        },
      ],
    ],
  });

  const detailsSection = CustomForm({
    fields: [
      [
        {
          type: "input",
          inputProps: { control, name: "name", required: true },
        },
        {
          type: "input",
          inputProps: { control, name: "name", required: true },
        },
        {
          type: "input",
          inputProps: { control, name: "name", required: true },
        },
      ],
    ],
  });

  return { generalSection, detailsSection };
};
