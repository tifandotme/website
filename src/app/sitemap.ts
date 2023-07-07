import { MetadataRoute } from "next";
import { baseUrl, navLinks } from "@/config";
import { allPosts } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const navRoutes = navLinks.map((nav) => ({
    url: baseUrl + nav.url,
    lastModified: new Date(),
  }));

  const contentRoutes = allPosts
    .sort((a, b) => new Intl.Collator().compare(b.date, a.date))
    .map((post) => ({
      url: baseUrl + post.url,
      lastModified: new Date(),
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...navRoutes,
    ...contentRoutes,
  ];
}
