import { Schema, model, models } from "mongoose";

const AddressSchema = new Schema<any>(
  {
    street: {
      type: String,
      required: [true, "street is required"],
    },
    buildingNo: {
      type: String,
      required: [true, "buildingNo is required"],
    },
    flatNo: {
      type: String,
      required: [true, "flatNo is required"],
    },
    city: {
      type: String,
      default: "",
    },
    postalCode: {
      type: String,
      required: [true, "postalCode is required"],
    },
  },
  {
    timestamps: true,
  },
);

const UserSchema = new Schema<any>(
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
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [25, "fullname must be at most 25 characters"],
    },
    phone: {
      type: String,
      default: "",
    },
    address: { type: AddressSchema, required: true },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model<any>("User", UserSchema);

export default User;
