import { MetadataRoute } from "next";
import { baseUrl } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // allow: "/",
      disallow: "/", // temporary
    },
    // host: baseUrl,
    sitemap: baseUrl + "/sitemap.xml",
  };
}
