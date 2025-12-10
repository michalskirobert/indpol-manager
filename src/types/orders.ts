import { ProductProps } from "./products";
import { StoreUser } from "./user";

export const DELIVERY_METHODS = {
  dpd: "DPD",
  inpost: "Inpost",
  ups: "UPS",
  dhl: "DHL",
} as const;

export enum DeliveryMethod {
  PickUp = 0,
  InpostCurier = 10,
  InpostParcelLocker = 11,
  InpostPickUpPoint = 12,
  DPD = 20,
}

export enum PaymentMethod {
  Transfer = 10,
  Payu = 20,
}

export enum OrderCreatrSteps {
  Cart = 1,
  Address = 2,
  Payment = 3,
}

export enum PaymentStatus {
  Pending = 0,
  Paid = 10,
  Failed = 20,
  Refunded = 30,
}

export enum OrderStatus {
  Pending = 0,
  InProgress = 10,
  PickedUp = 20,
  OutForDelivery = 30,
  Received = 40,
  Cancelled = 50,
}

export enum DeliveryMethods {
  PersonalCollection = 0,
  InPostCurierPrepayment = 10,
  InPostLocker = 30,
  DpdCurierPrepayment = 40,
}

export const deliveryCosts: Record<DeliveryMethods, number> = {
  [DeliveryMethods.PersonalCollection]: 0,
  [DeliveryMethods.InPostCurierPrepayment]: 15,
  [DeliveryMethods.InPostLocker]: 10,
  [DeliveryMethods.DpdCurierPrepayment]: 15,
};

export type CartItemProps = Pick<
  ProductProps,
  "productId" | "quantity" | "price" | "fullname" | "discount"
>;

export type CartProps = {
  userId: string | null;
  items: CartItemProps[];
};

export type InpostLockerDataProps = {
  province: string;
  city: string;
  postCode: string;
  street: string;
  name: string;
  concatedName: string;
  buildingNo?: string | null;
  flatNo?: string | null;
};

export type OrderProps = StoreUser & {
  userId: string | null;
  createdAt?: Date;
  cancelledDate?: string;
  items?: CartItemProps[];
  deliveryMethod: DeliveryMethods;
  deliveryFee: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  orderId?: string;
  totalAmount?: number;
  trackNumber?: string;
  purchaseDate?: Date | null;
  transactionId?: string;
  paymentMethod?: PaymentMethod;
  totalDiscount?: number;
  image?: string;
  promoCode?: string;
  paymentId?: string;
  lockerAddress?: InpostLockerDataProps;
};
