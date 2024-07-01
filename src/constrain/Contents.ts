import { ContentsTypeProps, SuggestionTypeProps } from "@/types/Types";
import timeTravel from "@/assets/time_travel.jpeg";

export const Contents: ContentsTypeProps[] = [
  {
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
