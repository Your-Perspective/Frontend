import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Pokemon = {
  id: number;
  name: string;
};

export interface ContentsTypeProps {
  id?: number;
  category?: string;
  image: string | StaticImport;
  author?: string;
  title?: string;
  description?: string;
  date_post?: string;
  view?: string;
  like?: string;
}

export interface SuggestionTypeProps {
  id: number;
  name: string;
}