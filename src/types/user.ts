import { ObjectId } from "mongoose";
import { User } from "next-auth";

export type UserProps = {
  _id: ObjectId | string;
  id: string;
  email: string;
  fullname: string;
  profileImgSrc: string;
  bgImgSrc: string;
  desc: string;
  permissions: { modules: string[]; actions: string[] };
  gender: "male" | "female";
  role: "admin" | "user";
  jobPosition:
    | "marketing"
    | "support"
    | "manager"
    | "seller"
    | "admin"
    | "owner";
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
};

export interface DatabaseUser extends User {
  password: string;
}

export interface RegisterUserArgs extends Omit<User, "_id"> {
  password: string;
  confirmPassword: string;
}

export interface SignInArgs {
  email: string;
  password: string;
  rememberMe?: boolean;
}
