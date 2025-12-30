import { useUploadImageMutation } from "@/store/services/images";
import { useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { FieldValues, Path, useController } from "react-hook-form";
import { displayErrorMessage } from "./utils";
import { toast } from "react-toastify";
import { InputAttachmentProps } from "../../types";

export const useAttachmentService = <T extends FieldValues>({
  control,
  name,
  size,
  disabled,
  maxFilesLength,
  multiple,
}: Omit<InputAttachmentProps<T>, "resolution">) => {
  const thumbRef = useRef<HTMLDivElement>(null);

  const { field } = useController({
    name: name as Path<T>,
    control,
    defaultValue: [] as unknown as T[typeof name],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [upload] = useUploadImageMutation();

  const images: string[] = field.value || [];

  const [mainIdx, setMainIdx] = useState(0);
  const [selectedThumbIdx, setSelectedThumbIdx] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [imageToRemove, setImageToRemove] = useState<string | null>(null);

  const scrollThumbnails = (direction: "left" | "right") => {
    const ref = thumbRef.current;
    if (!ref) return;
    const scrollAmount = 120;
    ref.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const onDrop = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
  ) => {
    if (rejectedFiles.length) {
      displayErrorMessage(rejectedFiles, size?.min, size?.max);
    }
    if (acceptedFiles.length === 0) return;

    setIsLoading(true);
    for (const file of acceptedFiles) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "indpol/products");

      try {
        const resp = await upload(fd).unwrap();
        const currentFields: string[] = [...(field.value || [])];
        currentFields.push(resp.url);
        field.onChange(currentFields);
      } catch (err) {
        console.error("Upload error:", err);
        toast.error("Failed to upload product's images");
      }
    }
    setIsLoading(false);
  };

  const { inputRef, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: maxFilesLength,
    maxSize: (size?.max || 5) * 1024 * 1024,
    minSize: (size?.min || 1) * 1024,
    disabled,
    multiple,
    accept: { "image/*": [] },
  });

  const onRemove = (image: string) => {
    const filteredImages = images.filter(
      (img: string) => img !== imageToRemove,
    );

    field.onChange(filteredImages);
    setImageToRemove(null);
  };

  return {
    images,
    field,
    inputRef,
    thumbRef,
    selectedThumbIdx,
    isLoading,
    mainIdx,
    modalOpen,
    modalImage,
    imageToRemove,
    getRootProps,
    getInputProps,
    onRemove,
    setModalImage,
    setMainIdx,
    setSelectedThumbIdx,
    setModalOpen,
    scrollThumbnails,
    setImageToRemove,
  };
};
