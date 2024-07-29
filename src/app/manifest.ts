import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Your perspective",
    short_name: "your-perspective",
    description: "Discover untold stories and whispered tales on our channel",
    start_url: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
