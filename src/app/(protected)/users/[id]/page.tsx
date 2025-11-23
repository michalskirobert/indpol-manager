"use client";

import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import {
  useChangeUserDataMutation,
  useGetUserQuery,
} from "@/store/services/users/users";

import { UserProps } from "@/types/user";
import { useSession } from "next-auth/react";

import React, { ChangeEvent, Usable, useEffect, useState } from "react";
import { Profile } from "./Profile";
import { useUploadImageMutation } from "@/store/services/upload";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import Image from "next/image";
import { Camera, Edit, View } from "lucide-react";
import { SettingsForm } from "./SettingsForm";
import { CustomButton } from "@/components/shared/button/CustomButton";

export type ProfileArgs = "profileImgSrc" | "bgImgSrc" | "data";

export default function Page({ params }: { params: Usable<{ id: string }> }) {
  const { data: session } = useSession();

  const { id } = React.use(params);

  const [upload] = useUploadImageMutation();
  const [updateUser] = useChangeUserDataMutation();

  const [data, setData] = useState<UserProps | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<ProfileArgs, boolean>>({
    bgImgSrc: false,
    profileImgSrc: false,
    data: false,
  });

  const { data: user, isFetching } = useGetUserQuery(id, {
    skip: !id || session?.user?.id !== id,
  });

  const setLoading = (id: ProfileArgs, state: boolean) =>
    setIsLoading((prev) => ({ ...prev, [id]: state }));

  const { update } = useSession();

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

      const updatedData: UserProps = {
        ...data,
        [fieldName]: resp.url,
      };

      await update(updatedData);

      setData(updatedData);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Your picture could not be uploaded!");
    } finally {
      setLoading(fieldName, false);
    }
  };

  useEffect(() => {
    if (id === session?.user?.id) {
      setData(session.user);

      return;
    }

    if (user) {
      setData(user);
    }
  }, [session?.user, user]);

  if (isFetching) return <div>Loading....</div>;

  if (!data)
    return (
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-center p-6 text-center">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              User not found
            </h3>
          </div>
        </div>
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <div className="relative overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative h-[320px] w-full md:h-65">
          {isLoading.bgImgSrc ? (
            <div className="flex h-full w-full animate-pulse justify-center bg-gray-300">
              <Spinner className="mt-10 h-25 w-25 text-blue-500" />
            </div>
          ) : (
            <Image
              src={data?.bgImgSrc || "/images/cover/cover-01.png"}
              alt="profile cover"
              fill
              className="rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            />
          )}
          {id === data?.id && !isLoading.bgImgSrc && (
            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="bgImgSrc"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
              >
                <input
                  type="file"
                  name="bgImgSrc"
                  id="bgImgSrc"
                  className="sr-only"
                  onChange={handleChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
                <Camera />
                <span>Edit</span>
              </label>
            </div>
          )}
        </div>
        <div className="relative z-30 mx-auto -mt-22 size-30 rounded-full bg-white/20 p-1 backdrop-blur sm:size-44 sm:p-3">
          <div className="relative z-10 size-full overflow-hidden rounded-full drop-shadow-2">
            {isLoading.profileImgSrc ? (
              <div className="flex h-full w-full animate-pulse items-center justify-center rounded-full bg-gray-500">
                <Spinner className="h-full w-full text-blue-500" />
              </div>
            ) : (
              <Image
                src={
                  data?.profileImgSrc ||
                  `/images/user/empty_img_${data?.gender}.jpg`
                }
                alt="profile"
                fill
                className="rounded-full object-cover object-center"
              />
            )}
          </div>
          {id === data?.id && !isLoading.profileImgSrc && (
            <label
              htmlFor="profileImgSrc"
              className="absolute bottom-0 right-0 z-20 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <Camera />
              <input
                type="file"
                name="profileImgSrc"
                id="profileImgSrc"
                className="sr-only"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>
          )}
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <CustomButton
            {...{
              icon: editMode ? <View /> : <Edit />,
              color: "light-blue",
              variant: "text",
              content: editMode ? "View profile" : "Edit profile",
              className: "mt-2",
              type: "button",
              onClick: () => setEditMode((prev) => !prev),
            }}
          />
          {editMode ? <SettingsForm /> : <Profile {...{ data, id }} />}
        </div>
      </div>
    </div>
  );
}
