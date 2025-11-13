import { House, Book, Box, ShoppingBag } from "lucide-react";

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
    ],
  },
];
