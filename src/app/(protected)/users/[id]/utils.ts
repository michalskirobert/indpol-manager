export function getPublicId(url: string) {
  const parts = url.split("/upload/")[1];
  const pathWithoutVersion = parts.replace(/^v\d+\//, "");
  const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");

  return publicId;
}
