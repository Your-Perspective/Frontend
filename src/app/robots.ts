import { MetadataRoute } from "next";
import { enviromentURL } from "./layout";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/pages/admin/",
    },
    sitemap: enviromentURL,
  };
}
