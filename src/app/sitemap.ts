import type { MetadataRoute } from "next";
import { kands } from "@/content/kands";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const kandRoutes: MetadataRoute.Sitemap = kands.map((kand) => ({
    url: `${SITE_URL}/kand/${kand.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...kandRoutes];
}
