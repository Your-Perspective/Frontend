import { Metadata } from "next";
import Writer from "./Writer";

export const metadata: Metadata = {
  title: "Write | Your perspective",
  description: "Express your thoughts on any topic by writing a blog post. Whether it’s a personal story, a review, or an opinion, this is your chance to share your voice.",
};

export default function page() {
  return <Writer />;
}
