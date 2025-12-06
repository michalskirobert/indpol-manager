import { ObjectId } from "mongoose";
import { User } from "next-auth";

export type PermissionItem = {
  preview: boolean;
  create?: boolean;
  edit?: boolean;
  remove?: boolean;
  changeStatus?: boolean;
  duplicate?: boolean;
};

export type Permissions = {
  [x: string]: PermissionItem;
};

export type UserProps = {
  _id: ObjectId;
  id: string;
  email: string;
  fullname: string;
  profileImgSrc: string;
  bgImgSrc: string;
  desc: string;
  permissions: Permissions;
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
  lastSeenAt: Date;
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

export interface StoreUserAddressParams {
  country?: string;
  city: string;
  postalCode: string;
  street: string;
  buildingNo: string;
  flatNo?: string;
}

export interface StoreUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: StoreUserAddressParams;
  createdAt: Date;
  updatedAt: Date;
}
