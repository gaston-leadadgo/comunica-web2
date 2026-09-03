import { CredibilityBand } from "@/components/sections/home/credibility-band";
import { DifferentialsBento } from "@/components/sections/home/differentials-bento";
import { ExtensionBlock } from "@/components/sections/shared/extension-block";
import { FinalCta } from "@/components/sections/home/final-cta";
import { HeroCinematic } from "@/components/sections/home/hero-cinematic";
import { IandreaBlock } from "@/components/sections/home/iandrea-block";
import { MethodStack } from "@/components/sections/home/method-stack";
import { ProblemBlock } from "@/components/sections/home/problem-block";
import { ProfileAccordion } from "@/components/sections/home/profile-accordion";
import { SavingsCalculator } from "@/components/sections/home/savings-calculator";
import { Testimonials } from "@/components/sections/home/testimonials";
import { Container } from "@/components/ui/section";
import { home } from "@/content/home";
import { ValueBento } from "@/components/sections/home/value-bento";

/**
 * Home.
 *
 * Estructura y copy: demo aprobada (web nueva/Copys). Diseno: propio.
 *
 * Recorrido AIDA:
 *   Atencion  hero cinematografico + banda de credibilidad
 *   Interes   problema (scrub) + bento de valor + testimonios
 *   Deseo     calculadora + acordeon de perfiles + iAndrea + Extension Dinamica
 *   Accion    diferenciales + metodologia apilada + CTA de cierre
 *
 * Ritmo claro/oscuro, sin dos bloques oscuros a sangre consecutivos:
 *   claro - OSCURO - claro - claro - claro - OSCURO - claro - OSCURO - claro -
 *   claro - claro - DEGRADADO
 */
export default function HomePage() {
  return (
    // overflow-x-hidden: cinturon de seguridad contra desbordes de las
    // animaciones de entrada, que se desplazan desde fuera del viewport.
    <main id="main" className="w-full max-w-full overflow-x-hidden">
      {/* ATENCION */}
      <HeroCinematic />
      <CredibilityBand />

      {/* INTERES */}
      <ProblemBlock />
      <ValueBento />
      <Testimonials />

      {/* DESEO */}
      <SavingsCalculator />
      <ProfileAccordion />
      <InnovationIntro />
      <IandreaBlock />
      <ExtensionBlock content={home.extension} />

      {/* ACCION */}
      <DifferentialsBento />
      <MethodStack />
      <FinalCta />
    </main>
  );
}

/**
 * Antesala del area de innovacion. Es un puente corto entre el acordeon de
 * perfiles y los dos bloques de producto (iAndrea y Extension Dinamica): sin el,
 * se pasa de "elige tu perfil" a "mira este producto" sin transicion.
 */
function InnovationIntro() {
  const { innovation } = home;
  return (
    <section data-tone="light" className="bg-paper pt-section pb-section-sm">
      <Container>
        <div className="mx-auto max-w-[52rem] text-center">
          <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
            {innovation.eyebrow}
          </p>
          <h2 className="mt-7 text-display-2 text-balance">{innovation.title}</h2>
          <p className="measure-lead mx-auto mt-7 text-lead text-fg-muted">
            {innovation.lead}
          </p>
        </div>
      </Container>
    </section>
  );
}
