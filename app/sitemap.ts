import type { MetadataRoute } from "next";

import { routes, site } from "@/content/site";

/**
 * Sitemap.
 *
 * Solo las cuatro paginas publicas mas contacto. Las legales van `noindex`
 * mientras sean esqueletos, asi que no entran: un sitemap que declara URLs
 * marcadas como no indexables es una senal contradictoria para el rastreador.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: { path: string; priority: number }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.soluciones, priority: 0.9 },
    { path: routes.nosotros, priority: 0.7 },
    { path: routes.partners, priority: 0.7 },
    { path: routes.contacto, priority: 0.6 },
  ];

  return entries.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
