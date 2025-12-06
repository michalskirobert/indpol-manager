import {
  CartItemProps,
  InpostLockerDataProps,
  OrderProps,
} from "@/types/orders";
import { StoreUserAddressParams } from "@/types/user";
import { Schema, model, models } from "mongoose";

const ItemSchema: Schema = new Schema<CartItemProps>({
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
});

const AddressSchema: Schema = new Schema<StoreUserAddressParams>({
  buildingNo: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  flatNo: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

const LockerAddressSchema: Schema = new Schema<InpostLockerDataProps>({
  buildingNo: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  flatNo: {
    type: String,
    required: false,
  },
  postCode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  concatedName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
});

const OrderSchema: Schema = new Schema<OrderProps>({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  deliveryMethod: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  items: {
    type: [ItemSchema],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: false,
  },
  cancelledDate: {
    type: String,
    required: false,
  },
  purchaseDate: {
    type: String,
    required: false,
  },
  trackNumber: {
    type: String,
    required: false,
  },
  transactionId: {
    type: String,
    required: false,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: Number,
    required: true,
  },
  totalDiscount: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  promoCode: {
    type: String,
    required: false,
  },
  paymentId: {
    type: String,
    required: false,
  },
  lockerAddress: {
    type: LockerAddressSchema,
    required: false,
  },
});

export const Order = models.Order || model("Order", OrderSchema);
