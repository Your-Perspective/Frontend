import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Pokemon = {
  id: number;
  name: string;
};

export interface Author {
  profileImage?: string | StaticImport;
  userName: string;
}

export interface ContentsTypeProps {
  slug: string;
  thumbnail?: string | StaticImport | undefined;
  summary: string;
  blogTitle: string;
  countViewer: number;
  formattedCountViewer: string;
  minRead?: number;
  published?: boolean;
  author: Author;
  createdAt?: string;
}

export interface Option {
  option?: "grid" | "column";
}

export interface AdsProps {
  id: number;
  title: string;
  imageUrl: string | undefined;
  link: string;
}

export type BlogsProps = AdsProps | ContentsTypeProps;

export interface BlogDetailsProps {
  slug: string;
  blogContent: string;
  summary: string;
  thumbnail?: string | StaticImport | undefined;
  blogTitle: string;
  countViewer: number;
  formattedCountViewer: string;
  minRead: number;
  published: boolean;
  author: {
    profileImage?: string | StaticImport;
    userName?: string;
    bio: string;
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

export interface RecentPostProps {
  createdAt: string;
  timeAgo: string;
  author: {
    userName: string;
  };
  slug: string;
  blogTitle: string;
}

export interface TopAuthorProps {
  username: string;
  bio: string | null;
  formattedTotalCountViewer: number;
  profileImage: StaticImport | string;
}

export interface AuthorDetailsProps {
  id: number;
  email: string;
  userName: string;
  bio: string;
  profileImage: string | StaticImport | undefined;
  formatTotalCountViewer: string;
  top3Count: number;
  about: string;
}

export interface BlogByAuthors {
  id: number;
  blogTitle: string;
  published: boolean;
  slug: string;
  isPin: boolean;
  countViewer: number;
  thumbnail: string | StaticImport;
  summary: string;
  minRead: number;
  isDeleted: boolean;
  createdAt: string;
  formattedCountViewer: string;
  author: {
    profileImage: string | StaticImport | undefined;
    userName: string;
  };
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
