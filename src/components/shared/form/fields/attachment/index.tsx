import { FieldValues } from "react-hook-form";
import { LoadingBlocker } from "@/components/shared/LoadingBlocker";
import Image from "next/image";
import { InputAttachmentProps } from "../../types";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { ZoomImage } from "./Zoom";
import { WarningModal } from "./WarningModal";
import { useAttachmentService } from "./service";
import { Feedback } from "../../Feedback";

export const Attachment = <T extends FieldValues>({
  control,
  name,
  size,
  disabled,
  multiple = true,
  maxFilesLength = 99,
}: InputAttachmentProps<T>) => {
  const {
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
    fieldState,
    getRootProps,
    getInputProps,
    onRemove,
    setModalImage,
    setMainIdx,
    setSelectedThumbIdx,
    setModalOpen,
    scrollThumbnails,
    setImageToRemove,
  } = useAttachmentService({
    control,
    name,
    disabled,
    maxFilesLength,
    multiple,
    size,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-lg bg-white px-5 pb-5 pt-3 shadow dark:bg-dark-2 md:flex-row">
        <div
          {...getRootProps({
            className: images.length ? "w-full md:w-1/2" : "w-full",
            tabIndex: 0,
          })}
        >
          <LoadingBlocker isLoading={isLoading}>
            <div
              className={`transition-color cursor-pointer border-4 border-dashed p-7 text-center duration-500 ${fieldState.invalid && !isLoading ? "border-red-500 hover:border-red-200" : "hover:border-blue-500"}`}
            >
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
          {fieldState.invalid && !isLoading && (
            <Feedback msg={fieldState.error?.message} />
          )}
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
                    <button
                      type="button"
                      className="absolute left-1 top-1 z-20 rounded bg-white p-1 text-xs text-red-500 shadow hover:bg-red-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageToRemove(url);
                      }}
                    >
                      <Trash2 size="15" />
                    </button>
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
      <WarningModal
        isOpen={!!imageToRemove}
        onClose={() => setImageToRemove(null)}
        imageUrl={imageToRemove}
        onRemove={onRemove}
      />
    </>
  );
};
