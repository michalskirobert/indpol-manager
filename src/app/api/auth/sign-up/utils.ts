import { UserProps } from "@/types/user";
import jwt from "jsonwebtoken";

export const generateUserToken = (user: UserProps) => {
  const secretKey = process.env.SECRET_JWT_TOKEN!;
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
  return token;
};
