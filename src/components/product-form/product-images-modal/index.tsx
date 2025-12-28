"use client";

import { useState } from "react";
import { useGetImagesQuery } from "@/store/services/images";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Image from "next/image";
import { CustomButton } from "../../shared/button/CustomButton";
import { Import, X, ZoomIn } from "lucide-react";
import { ImagesSkeleton } from "./Loading";
import { ZoomImage } from "./Zoom";
import { toast } from "react-toastify";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

interface Props {
  isOpen: boolean;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  toggle: () => void;
}

export const ProductImages = ({ isOpen, control, setValue, toggle }: Props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomIn, setIsZoomIn] = useState(false);

  const { data, isFetching } = useGetImagesQuery(
    { folder: "products" },
    { skip: !isOpen, refetchOnMountOrArgChange: true },
  );

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      return next;
    });
  };

  const images = useWatch({ control, name: "images" });

  const setImages = (value: string[]) =>
    setValue("images", [...images, ...value]);

  const handleImport = () => {
    const selectedIds = Array.from(selected);

    setImages(selectedIds);

    toast.success("Images have been appended.");

    toggle();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        handler={() => {
          if (selectedImage) return;

          toggle();
        }}
        size="xl"
      >
        <DialogHeader>Available images</DialogHeader>

        <DialogBody>
          <div className="h-[420px] overflow-y-auto">
            <div className="grid grid-cols-5 gap-3">
              {isFetching ? (
                <ImagesSkeleton />
              ) : !data ? (
                <div></div>
              ) : (
                data.resources.map(({ public_id, secure_url }) => {
                  const isAlreadyAdded = images?.includes(secure_url);
                  const isChecked = selected.has(secure_url);

                  return (
                    <div
                      key={public_id}
                      className={`group relative overflow-hidden rounded-md border ${
                        isAlreadyAdded ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      title={
                        isAlreadyAdded
                          ? "Image already added to this product"
                          : undefined
                      }
                    >
                      <Image
                        src={secure_url}
                        height={300}
                        width={300}
                        alt="Image"
                        className="h-[120px] w-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/40 transition ${
                          isAlreadyAdded
                            ? "opacity-0"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <button
                          type="button"
                          className="rounded-full bg-white/90 p-2 hover:bg-white"
                          onClick={() => {
                            if (isAlreadyAdded) return;
                            setSelectedImage(secure_url);
                            setIsZoomIn(true);
                          }}
                        >
                          <ZoomIn size={18} />
                        </button>
                      </div>
                      <label className="absolute left-2 top-2 rounded p-1">
                        <input
                          type="checkbox"
                          checked={isAlreadyAdded || isChecked}
                          disabled={isAlreadyAdded}
                          className="bg-none"
                          onChange={() => toggleSelect(secure_url)}
                        />
                      </label>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <CustomButton
            content={`Import (${selected.size})`}
            color="blue"
            icon={<Import />}
            disabled={selected.size === 0}
            onClick={handleImport}
          />
          <CustomButton content="Close" icon={<X />} onClick={toggle} />
        </DialogFooter>
      </Dialog>
      <ZoomImage
        image={selectedImage}
        isOpen={isZoomIn}
        close={() => {
          setSelectedImage("");
          setIsZoomIn(false);
        }}
      />
    </>
  );
};
