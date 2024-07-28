import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Pokemon = {
  id: number;
  name: string;
};

export interface ContentsTypeProps {
  slug: string;
  thumbnail?: string;
  summary: string;
  blogTitle: string;
  countViewer: number;
  minRead?: number;
  published?: boolean;
  author: {
    profileImage?: string | StaticImport;
    userName: string;
  };
  createdAt?: string;
}

export interface BlogDetailsProps {
  slug: string;
  blogContent: string;
  summary: string;
  thumbnail?: string;
  blogTitle: string;
  countViewer: number;
  minRead: number;
  published: boolean;
  author: {
    profileImage?: string | StaticImport;
    userName: string;
  };
  createdAt: string;
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
  link_label?: string;
  url: string | "#";
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

export interface RegisterAuthForm {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterAuthForm {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterAuthForm {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginAuthForm {
  email: string;
  password: string;
}

export interface ForgetPasswordAuthForm {
  email: string;
}

export interface ConfirmPasswordAuthForm {
  token: string;
  password: string;
  passwordConfirmation: string;
}
