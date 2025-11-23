import { UserProps } from "@typings/user";

declare module "next-auth" {
  interface Session {
    user: UserProps;
  }

  interface User extends UserProps {}
}

declare module "next-auth/jwt" {
  interface JWT extends UserProps {}
}
