import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Las legales aun son esqueletos y ya llevan `noindex` en su metadata.
      disallow: ["/legal/"],
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
