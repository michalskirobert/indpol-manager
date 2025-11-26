import { SettingsProfileFormArgs } from "./types";

export const defaultValues: SettingsProfileFormArgs = {
  _id: "",
  bgImgSrc: "",
  createdAt: new Date(),
  desc: "",
  email: "",
  fullname: "",
  gender: "male",
  id: "",
  jobPosition: "support",
  lastLogin: new Date(),
  permissions: { "/": { preview: true } },
  profileImgSrc: "",
  role: "user",
  newPassword: "",
  oldPassword: "",
};
