import {
  House,
  Book,
  Box,
  ShoppingBag,
  ImagesIcon,
  Settings,
} from "lucide-react";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: House,
        items: [],
      },
      {
        title: "Products",
        url: "/products",
        icon: Box,
        items: [],
      },
      {
        title: "Orders",
        url: "/orders",
        icon: ShoppingBag,
        items: [],
      },
      {
        title: "Gallery",
        icon: ImagesIcon,
        items: [
          {
            title: "Users",
            url: "/gallery/users",
          },
          {
            title: "Products",
            url: "/gallery/products",
          },
        ],
      },
      {
        title: "Dictionaries",
        icon: Book,
        items: [
          {
            title: "Categories",
            url: "/dictionaries/categories",
          },
          {
            title: "Brands",
            url: "/dictionaries/brands",
          },
        ],
      },
      {
        title: "Settings",
        icon: Settings,
        items: [
          {
            title: "Permissions",
            url: "/settings/permissions",
          },
        ],
      },
    ],
  },
];
