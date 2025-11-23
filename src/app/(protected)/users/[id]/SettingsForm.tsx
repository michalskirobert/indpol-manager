import { CustomButton } from "@/components/shared/button/CustomButton";
import { CustomForm } from "@/components/shared/form";
import { FieldProps } from "@/components/shared/form/types";
import { UserProps } from "@/types/user";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

interface Props {
  data: UserProps;
}

export const SettingsForm = ({ data }: Props) => {
  const { control, handleSubmit } = useForm({ defaultValues: data });
  const fields: FieldProps<UserProps>[][] = [
    [{ type: "input", inputProps: { control, name: "fullname" } }],
  ];

  const onSave = async (data: UserProps) => {
    try {
    } catch (error) {}
  };

  return (
    <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
      <CustomForm fields={fields}>
        <CustomButton content="Save" icon={<Save />} />
      </CustomForm>
    </div>
  );
};
