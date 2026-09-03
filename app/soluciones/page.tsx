import type { Metadata } from "next";

import { ClosingCta } from "@/components/sections/shared/closing-cta";
import { ExtensionBlock } from "@/components/sections/shared/extension-block";
import { SolucionesCapabilities } from "@/components/sections/soluciones/capabilities";
import { SolucionesHero } from "@/components/sections/soluciones/hero";
import { SolucionesIandreaDemo } from "@/components/sections/soluciones/iandrea-demo";
import { SolucionesIandrea } from "@/components/sections/soluciones/iandrea-deep";
import { SolucionesProfileTabs } from "@/components/sections/soluciones/profile-tabs";
import { soluciones } from "@/content/soluciones";

export const metadata: Metadata = {
  title: "Soluciones para hoteles",
  description:
    "Conectividad, voz, WiFi, IPTV, iAndrea e integraciones combinadas según el tamaño y la operativa de tu hotel. Cuatro perfiles: independiente, grupo, cadena y proyecto a medida.",
  alternates: { canonical: "/soluciones" },
};

/**
 * Soluciones.
 *
 * Ritmo claro/oscuro: claro - claro(warm) - claro - OSCURO - DEGRADADO. La unica
 * seccion oscura a sangre es iAndrea, que es el climax de la pagina, y el cierre
 * lleva el degradado como en el resto de la web.
 *
 * Las cuatro fichas de perfil y las siete capacidades salen de
 * `content/perfiles.ts`, el mismo fichero que alimenta la home: una sola fuente
 * de verdad, sin una segunda lista que se desincronice.
 */
export default function SolucionesPage() {
  return (
    <main id="main" className="w-full max-w-full overflow-x-hidden">
      <SolucionesHero />
      <SolucionesProfileTabs />
      <SolucionesCapabilities />
      <SolucionesIandrea />
      {/* El simulador va justo detras de la ficha de iAndrea: primero se explica
          que hace, y acto seguido se prueba. Separarlos obligaria a leer la
          ficha entera de memoria antes de llegar a la demo. */}
      <SolucionesIandreaDemo />
      <ExtensionBlock content={soluciones.extension} />
      <ClosingCta
        title={soluciones.closing.title}
        body={soluciones.closing.body}
        cta={soluciones.closing.cta}
      />
    </main>
  );
}
