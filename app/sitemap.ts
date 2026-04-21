import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://workload.devrma.com",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
