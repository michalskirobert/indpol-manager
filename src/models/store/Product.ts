import { ProductProps, VariantsDocument } from "@/types/products";
import mongoose, { model, Schema } from "mongoose";

const VariantsSchema = new Schema<VariantsDocument>({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
});

const DescriptionSchema = new Schema<ProductProps["desc"]>({
  pl: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  en: {
    type: String,
    required: false,
  },
});

export const ProductSchema: Schema = new Schema<ProductProps>({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: DescriptionSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryValue: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  variants: {
    type: [VariantsSchema],
    required: true,
  },
});

export const Product =
  mongoose.models.Product || model("Product", ProductSchema);
