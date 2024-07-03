import { ProductCardProps } from "./../types/Types";
import { DropdownSelectProps } from "@/types/Types";
import profile from "@/assets/product.jpeg";

export const ProductsOptionsSelect: DropdownSelectProps[] = [
  {
    display_name: "Types",
    label: "Types",
    items: [
      {
        label: "All",
        value: "all",
      },
      {
        label: "Big",
        value: "big",
      },
      {
        label: "Small",
        value: "small",
      },
    ],
  },
  {
    display_name: "Color",
    label: "Color",
    items: [
      {
        label: "All",
        value: "all",
      },
      {
        label: "Red",
        value: "red",
      },
      {
        label: "Blue",
        value: "blue",
      },
    ],
  },
  {
    display_name: "Sizes",
    label: "Sizes",
    items: [
      {
        label: "All",
        value: "all",
      },
      {
        label: "Large",
        value: "large",
      },
      {
        label: "Bigger",
        value: "bigger",
      },
    ],
  },
];

export const Products: ProductCardProps[] = [
  {
    uuid: "1",
    title: "Loose Jeans With Washwell Dark Wash",
    description:
      "Made with 100% organically grown cotton. Organic cotton is better for people and the environment because it's grown",
    oldPrice: 200,
    newPrice: 300,
    type: "Swag",
    colors: ["#7C91FB", "#575A68", "#BAC4FB"],
    thumbnail: profile,
  },
  {
    uuid: "2",
    title: "Slim Fit Denim Jacket",
    description:
      "Crafted from premium denim, this slim fit jacket offers a modern take on classic style.",
    // oldPrice: 250,
    newPrice: 225,
    type: "Fashion",
    colors: ["#3F51B5", "#FF5722", "#009688"],
    thumbnail: profile,
  },
  {
    uuid: "3",
    title: "Slim Fit Denim Jacket",
    description:
      "Crafted from premium denim, this slim fit jacket offers a modern take on classic style.",
    // oldPrice: 250,
    newPrice: 225,
    type: "Fashion",
    colors: ["#3F51B5", "#FF5722", "#009688"],
    thumbnail: profile,
  },
  {
    uuid: "4",
    title: "Slim Fit Denim Jacket",
    description:
      "Crafted from premium denim, this slim fit jacket offers a modern take on classic style.",
    // oldPrice: 250,
    newPrice: 225,
    type: "Fashion",
    colors: ["#3F51B5", "#FF5722", "#009688"],
    thumbnail: profile,
  },
  {
    uuid: "5",
    title: "Slim Fit Denim Jacket",
    description:
      "Crafted from premium denim, this slim fit jacket offers a modern take on classic style.",
    oldPrice: 250,
    newPrice: 225,
    type: "Fashion",
    colors: ["#3F51B5", "#FF5722", "#009688"],
    thumbnail: profile,
  },
  {
    uuid: "6",
    title: "Slim Fit Denim Jacket",
    description:
      "Crafted from premium denim, this slim fit jacket offers a modern take on classic style.",
    oldPrice: 250,
    newPrice: 225,
    type: "Fashion",
    colors: ["#3F51B5", "#FF5722", "#009688"],
    thumbnail: profile,
  },
];
