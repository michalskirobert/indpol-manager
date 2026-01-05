"use client";

import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, Usable, useEffect, useState } from "react";
import {
  useChangeUserDataMutation,
  useGetUserQuery,
} from "@/store/services/users/users";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "@/store/services/images";
import { toast } from "react-toastify";
import { LoadingBlocker } from "@/components/shared/LoadingBlocker";
import { UserNotFound } from "./NotFound";
import { UserProps } from "@/types/user";
import { BgImageSection } from "./BgImageSection";
import { ProfileImageSection } from "./ProfileImageSection";
import { EditViewControls } from "./EditViewControls";
import { getPublicId } from "./utils";

export type ProfileArgs = "profileImgSrc" | "bgImgSrc";

export default function Page({ params }: { params: Usable<{ id: string }> }) {
  const { data: session, status, update } = useSession();
  const { id } = React.use(params);

  const [upload] = useUploadImageMutation();
  const [removePicture] = useDeleteImageMutation();
  const [updateUser, { isLoading: isUpdating }] = useChangeUserDataMutation();

  const [data, setData] = useState<UserProps | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<ProfileArgs, boolean>>({
    bgImgSrc: false,
    profileImgSrc: false,
  });
  const [isRemovingPicture, setIsRemovingPicture] = useState<
    Record<ProfileArgs, boolean>
  >({ bgImgSrc: false, profileImgSrc: false });

  const {
    data: user,
    isFetching,
    isError,
  } = useGetUserQuery(id, { skip: !id || session?.user?.id === id });

  const setLoading = (fieldId: ProfileArgs, state: boolean) =>
    setIsLoading((prev) => ({ ...prev, [fieldId]: state }));
  const setRemovingLoading = (fieldId: ProfileArgs, state: boolean) =>
    setIsRemovingPicture((prev) => ({ ...prev, [fieldId]: state }));

  const handleRemovingPicture = async (fieldId: ProfileArgs) => {
    if (!data?.[fieldId]) return;
    setRemovingLoading(fieldId, true);

    try {
      await removePicture({ public_id: [getPublicId(data[fieldId])] }).unwrap();
      await updateUser({ id, body: { [fieldId]: "" } }).unwrap();
      await update({ ...data, [fieldId]: "" });
      setData({ ...data, [fieldId]: "" });
      toast.success("Picture has been removed from the server");
    } catch (error) {
      console.error("Error removing picture:", error);
      toast.error("Failed to remove picture.");
    } finally {
      setRemovingLoading(fieldId, false);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!data || !e.target?.files?.length) return;
    const file = e.target.files[0];
    const fieldName = e.target.name as ProfileArgs;
    setLoading(fieldName, true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("path", `indpol/users/${id}`);

    try {
      const resp = await upload(fd).unwrap();
      await updateUser({ id, body: { [fieldName]: resp.url } }).unwrap();
      const updatedData: UserProps = { ...data, [fieldName]: resp.url };
      await update(updatedData);
      setData(updatedData);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload your picture.");
    } finally {
      setLoading(fieldName, false);
    }
  };

  useEffect(() => {
    const initializeData = () => {
      if (id === session?.user?.id) {
        setData(session.user);
        return;
      }
      if (user) {
        setData(user);
      }
    };
    initializeData();
  }, [session?.user, user, id]);

  const isCurrentUser = id === session?.user?.id;

  return (
    <LoadingBlocker
      isLoading={
        isLoading.bgImgSrc ||
        isLoading.profileImgSrc ||
        isFetching ||
        isUpdating ||
        status === "loading"
      }
    >
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Profile" />

        {isError ? (
          <UserNotFound />
        ) : (
          <div className="relative overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <BgImageSection
              bgImgSrc={data?.bgImgSrc}
              isCurrentUser={isCurrentUser}
              isLoading={isLoading}
              isRemovingPicture={isRemovingPicture}
              handleChange={handleChange}
              handleRemovingPicture={handleRemovingPicture}
            />
            <ProfileImageSection
              profileImgSrc={data?.profileImgSrc}
              userGender={data?.gender}
              isCurrentUser={isCurrentUser}
              isLoading={isLoading}
              isRemovingPicture={isRemovingPicture}
              handleChange={handleChange}
              handleRemovingPicture={handleRemovingPicture}
            />
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <EditViewControls
                isCurrentUser={isCurrentUser}
                editMode={editMode}
                setEditMode={setEditMode}
                id={id}
                data={data}
                isUpdating={isUpdating}
                updateUser={updateUser}
              />
            </div>
          </div>
        )}
      </div>
    </LoadingBlocker>
  );
}
