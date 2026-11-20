import type { MetadataRoute } from "next";

const SITE_URL = "https://workload.devrma.com";
const LAST_CONTENT_CHANGE = "2026-09-14";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_CONTENT_CHANGE);

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
