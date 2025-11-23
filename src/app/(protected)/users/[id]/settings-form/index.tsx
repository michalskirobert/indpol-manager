import { CustomButton } from "@/components/shared/button/CustomButton";
import { CustomForm } from "@/components/shared/form";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { SettingsFormProps, SettingsProfileFormArgs } from "./types";
import { buildFields } from "./helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useEffect } from "react";

export const SettingsForm = ({
  id,
  data,
  isUpdating,
  updateUser,
}: SettingsFormProps) => {
  const {
    control,
    formState: { isDirty },
    reset,
    handleSubmit,
  } = useForm<SettingsProfileFormArgs>({
    resolver: yupResolver(schema),
  });

  const { status, update } = useSession();

  const fields = buildFields(control);

  const onSave = async (data: SettingsProfileFormArgs) => {
    try {
      const resp = await updateUser({ id, body: data }).unwrap();
      await update(resp);
      reset(resp);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    if (!data) return;

    reset(data);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-12">
        <CustomForm fields={fields} />
      </div>
      <CustomButton
        content="Save changes"
        icon={<Save />}
        isLoading={status === "loading" || isUpdating}
        tooltip={!isDirty ? "No changes to save" : "Save your changes"}
        disabled={!isDirty}
        type="submit"
      />
    </form>
  );
};
