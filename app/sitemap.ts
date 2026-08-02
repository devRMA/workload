import type { MetadataRoute } from "next";

const SITE_URL = "https://workload.devrma.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/custo-da-hora`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
