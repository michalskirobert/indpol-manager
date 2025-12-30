import { FileRejection } from "react-dropzone";
import { toast } from "react-toastify";

export const setErrorMessage = (
  key: string,
  minSize: number,
  maxSize: number,
) => {
  const messages: Record<string, string> = {
    "file-too-large": `File is too large. Maximum allowed size is ${maxSize}MB.`,
    "file-too-small": `File is too small. Minimum allowed size is ${minSize}KB.`,
    "file-invalid-type": `Invalid file type. Only image files are allowed.`,
    "too-many-files": `Exceeded the maximum number of files allowed.`,
    "file-too-long-name": `File name is too long. Please shorten it before uploading.`,
  };

  return messages[key] || "Unknown error occurred while uploading the file.";
};

export const displayErrorMessage = (
  rejectedFiles: FileRejection[],
  minSize?: number,
  maxSize?: number,
): void => {
  if (rejectedFiles.length === 0) return;

  const errorMessages = rejectedFiles.flatMap(({ errors }) =>
    errors.map(({ code }) => setErrorMessage(code, minSize || 1, maxSize || 5)),
  );

  const formattedMessages = errorMessages.map((msg) => `- ${msg}`).join("\n");

  toast.error(`An error occurred while uploading files:\n${formattedMessages}`);
};

export const extractPublicId = (imageUrl: string) => {
  const marker = "/indpol/";
  const index = imageUrl.indexOf(marker);

  if (index === -1) {
    throw new Error("Invalid image URL: cannot extract publicId");
  }

  return imageUrl.substring(index + 1);
};
