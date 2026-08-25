import type { Metadata } from "next";

import { PartnersBenefitsAndStart } from "@/components/sections/partners/benefits-and-start";
import { PartnersHero } from "@/components/sections/partners/hero";
import { PartnersModels } from "@/components/sections/partners/models";
import { PartnersPortal } from "@/components/sections/partners/portal";
import { ClosingCta } from "@/components/sections/shared/closing-cta";
import { partners } from "@/content/partners";

export const metadata: Metadata = {
  title: "Canal de partners",
  description:
    "Service Provider o Referral Partner: amplía lo que puedes ofrecer a tus clientes con la tecnología, la preventa y el soporte de Comunica detrás de tu propuesta.",
  alternates: { canonical: "/partners" },
};

/**
 * Partners.
 *
 * A diferencia del plan inicial, esta pagina SI se indexa. Alli iba `noindex`
 * porque el prototipo era un portal simulado con un perfil ficticio y comisiones
 * de canal publicadas. Esta version no tiene nada de eso: es una pagina de
 * captacion de canal, sin cifras de comision y sin login falso, asi que
 * indexarla no crea ningun problema comercial.
 *
 * Ritmo: OSCURO - claro - warm - claro - DEGRADADO. Es la unica pagina que abre en
 * oscuro, porque su lector no es el hotelero.
 */
export default function PartnersPage() {
  return (
    <main id="main" className="w-full max-w-full overflow-x-hidden">
      <PartnersHero />
      <PartnersModels />
      <PartnersBenefitsAndStart />
      <PartnersPortal />
      <ClosingCta
        title={partners.reflection.highlight}
        body={[
          `${partners.reflection.lead.before} ${partners.reflection.lead.emphasis}`,
          partners.reflection.body,
        ]}
        cta={partners.reflection.cta}
      />
    </main>
  );
}
