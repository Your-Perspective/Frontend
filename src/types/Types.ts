import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Pokemon = {
  id: number;
  name: string;
};

export interface ContentsTypeProps {
  uuid: string;
  id?: number;
  category?: string;
  image: string | StaticImport;
  author?: string;
  title?: string;
  description?: string;
  date_post?: string;
  view?: string;
  minute_read?: string;
  content: string;
}

export interface SuggestionTypeProps {
  id: number;
  name: string;
}

export type TabItem = {
  value: string;
  label: string;
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
  thumbnail: string | StaticImport;
  oldPrice?: number;
  newPrice: number;
  title: string;
  description?: string;
  type: string;
  colors?: Array<string>;
};
