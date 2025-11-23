import { DatabaseUser } from "@/types/user";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<DatabaseUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImgSrc: {
      type: String,
      default: "",
    },
    bgImgSrc: {
      type: String,
      default: "",
    },
    permissions: {
      modules: {
        type: [String],
        default: [],
      },
      actions: {
        type: [String],
        default: [],
      },
    },
    desc: {
      type: String,
      default: "",
    },
    fullname: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model<DatabaseUser>("User", UserSchema);

export default User;
