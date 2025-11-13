import { ObjectId } from "mongoose";
import { User } from "next-auth";

export type UserProps = {
  _id: ObjectId | string;
  email: string;
  fullname: string;
  profileImgSrc: string;
  bgImgSrc: string;
  desc: string;
  permissions: { modules: string[]; actions: string[] };
};

export interface RegisterUserArgs extends Omit<User, "_id"> {
  password: string;
  confirmPassword: string;
}

export interface SignInArgs extends Omit<User, "_id"> {
  password: string;
}
