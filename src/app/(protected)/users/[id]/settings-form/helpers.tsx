import { FieldProps } from "@/components/shared/form/types";
import { Control } from "react-hook-form";
import { PersonStanding } from "lucide-react";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { FormArgs } from ".";

export const buildFields = (
  control: Control<FormArgs>,
): FieldProps<FormArgs>[][] => [
  [
    {
      type: "input",
      inputProps: {
        control,
        label: "Full name",
        required: true,
        name: "fullname",
        icon: <PersonStanding />,
      },
    },
    {
      type: "input",
      inputProps: {
        control,
        label: "Email address",
        required: true,
        name: "email",
        icon: <EmailIcon />,
      },
    },
  ],
  [
    {
      type: "input",
      inputProps: {
        control,
        label: "Current password",
        icon: <PasswordIcon />,
        name: "oldPassword",
        type: "password",
      },
    },
    {
      type: "input",
      inputProps: {
        control,
        label: "New password",
        icon: <PasswordIcon />,
        name: "newPassword",
        type: "password",
      },
    },
  ],
  [
    {
      type: "textarea",
      textareaProps: {
        control,
        label: "About me",
        name: "desc",
      },
    },
  ],
];
