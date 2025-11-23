"use client";

import { View, Edit } from "lucide-react";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { SettingsForm } from "./settings-form";
import { Profile } from "./Profile";
import { UserProps } from "@/types/user";

interface EditViewControlsProps {
  isCurrentUser: boolean;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  id: string;
  data: UserProps | null;
  isUpdating: boolean;
  updateUser: any;
}

export const EditViewControls = ({
  isCurrentUser,
  editMode,
  id,
  data,
  isUpdating,
  updateUser,
  setEditMode,
}: EditViewControlsProps) => (
  <>
    {isCurrentUser && (
      <CustomButton
        icon={editMode ? <View /> : <Edit />}
        color="light-blue"
        variant="text"
        content={editMode ? "View profile" : "Edit profile settings"}
        className="mt-2"
        type="button"
        onClick={() => setEditMode(!editMode)}
      />
    )}
    {editMode ? (
      <SettingsForm {...{ id, data, isUpdating, updateUser }} />
    ) : (
      <Profile {...{ data, id }} />
    )}
  </>
);
