"use client";

import Image from "next/image";
import { Camera, Trash } from "lucide-react";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { ChangeEvent } from "react";
import { ProfileArgs } from "./page";

interface BgImageSectionProps {
  bgImgSrc?: string;
  isCurrentUser: boolean;
  isLoading: Record<ProfileArgs, boolean>;
  isRemovingPicture: Record<ProfileArgs, boolean>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemovingPicture: (field: ProfileArgs) => void;
}

export const BgImageSection = ({
  bgImgSrc,
  isCurrentUser,
  isLoading,
  isRemovingPicture,
  handleChange,
  handleRemovingPicture,
}: BgImageSectionProps) => (
  <div className="relative h-[320px] w-full md:h-65">
    <Image
      src={bgImgSrc || "/images/cover/cover-01.png"}
      alt="profile cover"
      fill
      className="rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
    />
    {isCurrentUser && !isLoading.bgImgSrc && (
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
          <span>Change cover</span>
        </label>
      </div>
    )}
    {bgImgSrc && (
      <div className="absolute bottom-4 right-4 z-50">
        <CustomButton
          icon={<Trash />}
          variant="filled"
          className="size-8.5 rounded-full p-1"
          color="red"
          isLoading={isRemovingPicture.bgImgSrc}
          onClick={() => handleRemovingPicture("bgImgSrc")}
        />
      </div>
    )}
  </div>
);
