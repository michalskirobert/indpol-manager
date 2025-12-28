import { useUploadImageMutation } from "@/store/services/images";
import { useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { FieldValues, Path, useController } from "react-hook-form";
import { displayErrorMessage } from "./utils";
import { toast } from "react-toastify";
import { LoadingBlocker } from "@/components/shared/LoadingBlocker";
import Image from "next/image";
import { InputAttachmentProps } from "../../types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ZoomImage } from "./Zoom";

export const Attachment = <T extends FieldValues>({
  control,
  name,
  size,
  disabled,
  multiple = true,
  maxFilesLength = 99,
}: InputAttachmentProps<T>) => {
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

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-lg bg-white px-5 pb-5 pt-3 shadow md:flex-row">
        <div
          {...getRootProps({
            className: images.length ? "w-full md:w-1/2" : "w-full",
            tabIndex: 0,
          })}
        >
          <LoadingBlocker isLoading={isLoading}>
            <div className="transition-color cursor-pointer border-4 border-dashed p-7 text-center duration-500 hover:border-blue-500">
              <input
                {...getInputProps()}
                ref={inputRef}
                type="file"
                accept="image/*"
                role="region"
              />
              <p>Drop image here...</p>
            </div>
          </LoadingBlocker>
        </div>

        {images.length > 0 && (
          <div className="flex w-full max-w-[250px] flex-col gap-3 md:w-1/2 md:max-w-[1000px]">
            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-50 md:h-96">
              <Image
                src={images[selectedThumbIdx]}
                alt="Product image"
                fill
                className="object-cover"
              />
              {selectedThumbIdx !== mainIdx && (
                <button
                  className="absolute right-2 top-2 z-10 rounded bg-white px-2 py-1 text-xs text-gray-800 shadow hover:bg-gray-100"
                  onClick={() => {
                    const newImages = [...images];
                    const [selected] = newImages.splice(selectedThumbIdx, 1);
                    newImages.unshift(selected);
                    field.onChange(newImages);
                    setMainIdx(0);
                    setSelectedThumbIdx(0);
                  }}
                >
                  Set as main
                </button>
              )}
              <button
                className="absolute inset-0"
                onClick={() => {
                  setModalImage(images[mainIdx]);
                  setModalOpen(true);
                }}
              />
            </div>
            <div className="relative flex w-full items-center gap-2 overflow-x-auto py-2">
              <button
                type="button"
                onClick={() => scrollThumbnails("left")}
                className="absolute left-0 z-10 rounded-full bg-white p-1 shadow hover:bg-gray-100"
              >
                <ArrowLeft />
              </button>
              <div
                ref={thumbRef}
                className="flex w-full gap-2 overflow-x-auto px-6"
              >
                {images.map((url, idx) => (
                  <div
                    key={idx}
                    className={`relative h-20 w-20 flex-shrink-0 rounded-lg border-2 ${
                      idx === selectedThumbIdx
                        ? "border-blue-600"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedThumbIdx(idx)}
                  >
                    <Image
                      src={url}
                      alt={`Thumbnail ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollThumbnails("right")}
                className="absolute right-0 z-10 rounded-full bg-white p-1 shadow hover:bg-gray-100"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
      {modalOpen && modalImage && (
        <ZoomImage
          image={modalImage}
          isOpen={modalOpen}
          close={() => setModalOpen(false)}
        />
      )}
    </>
  );
};
