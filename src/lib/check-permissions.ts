import { UserProps } from "@/types/user";

export function canAccessRoute(user: unknown, pathname: string): boolean {
  const currentUser = user as UserProps;

  if (!currentUser) return false;

  if (currentUser.role === "admin") return true;

  const cleanPath = pathname.split("?")[0].replace(/\/$/, "");

  const permissionEntry = currentUser.permissions[cleanPath];
  if (!permissionEntry) return false;

  return !!permissionEntry.preview;
}
