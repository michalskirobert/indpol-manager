"use client";

import { useState } from "react";
import {
  useDeleteImageMutation,
  useGetImagesQuery,
} from "@/store/services/images";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Image from "next/image";
import { CustomButton } from "@shared/button/CustomButton";
import { Import, X, ZoomIn, Trash2 } from "lucide-react";
import { ImagesSkeleton } from "./Loading";
import { ZoomImage } from "./Zoom";
import { toast } from "react-toastify";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { WarningModal } from "./WarningModal";
import { ProductFormInput } from "../types";

interface Props {
  isOpen: boolean;
  control: Control<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
  toggle: () => void;
}

export const ProductImages = ({ isOpen, control, setValue, toggle }: Props) => {
  const [deleteImage, { isLoading }] = useDeleteImageMutation();

  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomIn, setIsZoomIn] = useState(false);
  const [imageToDelete, setImageToDelete] = useState("");
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data, isFetching, refetch } = useGetImagesQuery(
    { folder: "products" },
    { skip: !isOpen, refetchOnMountOrArgChange: true },
  );

  const toggleWarningModal = () => setWarningModalOpen((prev) => !prev);

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

  const handleDelete = async () => {
    try {
      await deleteImage({ public_id: [imageToDelete] });
      toast.success("Image deleted successfully.");
      refetch();
      setImageToDelete("");

      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(imageToDelete);
        return next;
      });

      setValue(
        "images",
        images.filter((img: string) => !img.includes(imageToDelete)),
      );

      toggleWarningModal();
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        handler={() => {
          if (selectedImage || imageToDelete) return;

          toggle();
        }}
        size="xl"
      >
        <DialogHeader>Available images</DialogHeader>

        <DialogBody>
          <div className="h-[420px] overflow-y-auto">
            {isFetching ? (
              <ImagesSkeleton />
            ) : !data?.resources?.length ? (
              <div className="flex h-[420px] w-full items-center justify-center">
                <h2 className="text-center text-lg text-gray-500">
                  No images available
                </h2>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-3">
                {data.resources.map(({ public_id, secure_url }) => {
                  const isAlreadyAdded = images?.includes(secure_url);
                  const isChecked = selected.has(secure_url);

                  return (
                    <div
                      key={public_id}
                      className={`group relative overflow-hidden rounded-md border`}
                    >
                      <Image
                        src={secure_url}
                        height={300}
                        width={300}
                        alt="Image"
                        className="h-[120px] w-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition group-hover:opacity-100`}
                      >
                        <button
                          type="button"
                          className="pointer-events-auto rounded-full bg-white/90 p-2 hover:bg-white"
                          onClick={() => {
                            setSelectedImage(secure_url);
                            setIsZoomIn(true);
                          }}
                        >
                          <ZoomIn size={18} />
                        </button>
                      </div>
                      <div className="absolute left-2 top-2 flex items-center space-x-1 rounded bg-white/90 p-1">
                        <label className="rounded p-1">
                          <input
                            type="checkbox"
                            checked={isAlreadyAdded || isChecked}
                            className={`bg-none ${isAlreadyAdded ? "opacity-50" : ""}`}
                            onChange={() => {
                              if (isAlreadyAdded) return;

                              toggleSelect(secure_url);
                            }}
                            title={
                              isAlreadyAdded
                                ? "Image already added to this product"
                                : ""
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setImageToDelete(public_id);
                            toggleWarningModal();
                          }}
                          className="rounded p-1 hover:bg-red-600 hover:text-white"
                          title="Delete image"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
      <WarningModal
        isLoading={isLoading}
        isOpen={warningModalOpen}
        onClose={toggleWarningModal}
        onRemove={handleDelete}
      />
    </>
  );
};
