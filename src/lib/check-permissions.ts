import { UserProps } from "@/types/user";

export function canAccessRoute(user: UserProps, pathname: string): boolean {
  console.log(user);
  if (user.role === "admin") return true;

  const cleanPath = pathname.split("?")[0].replace(/\/$/, "");

  const permissionEntry = user.permissions[cleanPath];
  if (!permissionEntry) return false;

  return !!permissionEntry.preview;
}
