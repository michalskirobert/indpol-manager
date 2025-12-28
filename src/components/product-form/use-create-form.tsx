import { Control } from "react-hook-form";
import { CustomForm } from "../shared/form";

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
            type: "number",
            label: "Price",
            name: "price",
            required: true,
          },
        },
        {
          type: "input",
          inputProps: { control, name: "name", required: true },
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
