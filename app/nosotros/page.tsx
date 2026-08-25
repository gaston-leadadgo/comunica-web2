import type { Metadata } from "next";

import { NosotrosHero } from "@/components/sections/nosotros/hero";
import { NosotrosKnowledge } from "@/components/sections/nosotros/knowledge";
import { NosotrosScale } from "@/components/sections/nosotros/scale";
import { NosotrosTeamAndVision } from "@/components/sections/nosotros/team-and-vision";
import { NosotrosTrust } from "@/components/sections/nosotros/trust";
import { ClosingCta } from "@/components/sections/shared/closing-cta";
import { nosotros } from "@/content/nosotros";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "No somos un operador que también trabaja con hoteles: somos especialistas en tecnología hotelera. 350 hoteles en 13 países y una forma de trabajar que empieza escuchando.",
  alternates: { canonical: "/nosotros" },
};

/**
 * Nosotros.
 *
 * Los ocho bloques del copy se agrupan en seis secciones: equipo, innovacion y
 * anticipacion comparten superficie en `NosotrosTeamAndVision`. Separados en tres
 * secciones con su propio ritmo vertical, la pagina medía casi el doble sin
 * ganar ni una idea.
 *
 * Ritmo: claro - warm - OSCURO - claro - warm-2 - DEGRADADO. La seccion oscura es
 * la de la cifra, que es donde la marca reclama autoridad.
 */
export default function NosotrosPage() {
  return (
    <main id="main" className="w-full max-w-full overflow-x-hidden">
      <NosotrosHero />
      <NosotrosKnowledge />
      <NosotrosScale />
      <NosotrosTrust />
      <NosotrosTeamAndVision />
      <ClosingCta
        title={nosotros.finalCta.title}
        body={nosotros.finalCta.body}
        highlight={nosotros.finalCta.highlight}
        cta={nosotros.finalCta.cta}
      />
    </main>
  );
}
