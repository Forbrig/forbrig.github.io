import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "",
      images: ["https://forbrig.github.io/cartoon-profile.png"],
      priority: 1,
    },
    {
      url: "experiences",
    },
    {
      url: "projects",
    },
    {
      url: "contact",
    },
  ].map((route) => ({
    ...route,
    url: `https://forbrig.github.io/${route.url}`,
  }));
}
