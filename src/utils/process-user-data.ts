import { UserProps } from "@/types/user";

export const getJobPosition = (role: UserProps["jobPosition"] | undefined) => {
  if (!role) {
    return "Position not found";
  }

  const source: Record<UserProps["jobPosition"], string> = {
    admin: "Administrator",
    manager: "Manager",
    marketing: "Marketing / SEO",
    owner: "CEO",
    seller: "Seller",
    support: "Support",
  };

  return source[role];
};

export const getRole = (role: UserProps["role"] | undefined = "user") => {
  const source: Record<UserProps["role"], string> = {
    admin: "Administrator",
    user: "User",
  };

  return source[role];
};
