import { UserProps } from "@/types/user";

export type ChangeUserDataArgs = {
  id: string;
  body: Partial<UserProps>;
};
