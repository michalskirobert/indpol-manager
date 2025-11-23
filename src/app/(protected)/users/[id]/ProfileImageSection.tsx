"use client";

import Image from "next/image";
import { Camera, Trash } from "lucide-react";
import { ChangeEvent } from "react";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { ProfileArgs } from "./page";

interface ProfileImageSectionProps {
  profileImgSrc?: string;
  userGender?: string;
  isCurrentUser: boolean;
  isLoading: Record<ProfileArgs, boolean>;
  isRemovingPicture: Record<ProfileArgs, boolean>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemovingPicture: (field: ProfileArgs) => void;
}

export const ProfileImageSection = ({
  profileImgSrc,
  userGender,
  isCurrentUser,
  isLoading,
  isRemovingPicture,
  handleChange,
  handleRemovingPicture,
}: ProfileImageSectionProps) => (
  <div className="relative z-30 mx-auto -mt-22 size-30 rounded-full bg-white/20 p-1 backdrop-blur sm:size-44 sm:p-3">
    <div className="relative z-10 size-full overflow-hidden rounded-full drop-shadow-2">
      <Image
        src={profileImgSrc || `/images/user/empty_img_${userGender}.jpg`}
        alt="profile"
        fill
        className="rounded-full object-cover object-center"
      />
    </div>
    {isCurrentUser && !isLoading.profileImgSrc && (
      <>
        <label
          htmlFor="profileImgSrc"
          className="absolute bottom-0 right-0 z-20 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
        >
          <Camera />
          <span className="sr-only">Change profile picture</span>
          <input
            type="file"
            name="profileImgSrc"
            id="profileImgSrc"
            className="sr-only"
            onChange={handleChange}
            accept="image/png, image/jpg, image/jpeg"
          />
        </label>
        {profileImgSrc && (
          <div className="absolute bottom-2 left-1 z-20">
            <CustomButton
              icon={<Trash />}
              variant="filled"
              className="size-8.5 rounded-full p-1"
              color="red"
              isLoading={isRemovingPicture.profileImgSrc}
              onClick={() => handleRemovingPicture("profileImgSrc")}
            />
          </div>
        )}
      </>
    )}
  </div>
);
