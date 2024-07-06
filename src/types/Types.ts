import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Pokemon = {
  id: number;
  name: string;
};

export interface ContentsTypeProps {
  slug: string;
  thumbnail: string;
  summary: string;
  blogTitle: string;
  countViewer: number;
  minRead?: number;
  published: boolean;
  author: {
    profileImage: string;
    userName: string;
  };
  createdAt?: string;
}

export interface SuggestionTypeProps {
  id: number;
  name: string;
}

export type TabItem = {
  id: number;
  title: string;
  slug: string;
};

export interface AlertProps {
  title: string;
  content?: string;
  variant?: "success" | "info" | "warning" | "error" | undefined;
}

export type DropdownSelectProps = {
  display_name: string;
  label: string;
  items: Array<{
    value: string;
    label: string;
  }>;
};

export type ProductCardProps = {
  uuid: string;
  thumbnail: StaticImport | string;
  oldPrice?: number;
  newPrice: number;
  title: string;
  description?: string;
  type: string;
  colors?: Array<string>;
  size?: Array<string>;
  stocked?: number;
};
