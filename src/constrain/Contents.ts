import { ContentsTypeProps, SuggestionTypeProps, TabItem } from "@/types/Types";
import timeTravel from "@/assets/time_travel.jpeg";

export const Contents: ContentsTypeProps[] = [
  {
    uuid: "b6daa3fe-3ed1-42ad-a083-f7f18ac751a4",
    id: 1,
    category: "foryou",
    image: timeTravel,
    author: "Limhai",
    title: "Time travel Stock Photos",
    description:
      "To understand what Spring Boot is and its features, we should get back to the Spring framework first.",
    date_post: "Nov 22, 2023",
    view: "90",
    like: "1000",
  },
  {
    uuid: "14ed676c-5d93-46f3-87c5-5feb66ed3c67",
    id: 2,
    category: "following",
    image: timeTravel,
    author: "Seangleng",
    title: "Time travel",
    description:
      "To understand what Spring Boot is and its features, we should get back to the Spring framework first.",
    date_post: "Nov 21, 2023",
    view: "100",
    like: "1100",
  },
  {
    uuid: "de74ce9d-7193-48bd-bc0b-01c1adae1f66",
    id: 3,
    category: "alien",
    image: timeTravel,
    author: "seangleng",
    title: "Time travel - 1",
    description:
      "To understand what Spring Boot is and its features, we should get back to the Spring framework first.",
    date_post: "Nov 22, 2023",
    view: "90",
    like: "1000",
  },
  {
    uuid: "5528840d-a9c4-4855-ab5a-58db17cec379",
    id: 4,
    category: "foryou",
    image: timeTravel,
    author: "seangleng",
    title: "Time travel Photos",
    description:
      "To understand what Spring Boot is and its features, we should get back to the Spring framework first.",
    date_post: "Nov 22, 2023",
    view: "90",
    like: "1000",
  },
];

export const SuggestionCategories: SuggestionTypeProps[] = [
  {
    id: 1,
    name: "Alien",
  },
  {
    id: 2,
    name: "Technologies",
  },
  {
    id: 3,
    name: "Date Science",
  },
  {
    id: 4,
    name: "Relationship",
  },
];

export const tabs: TabItem[] = [
  { value: "foryou", label: "For you" },
  { value: "following", label: "Following" },
  { value: "alien", label: "Alien" },
];