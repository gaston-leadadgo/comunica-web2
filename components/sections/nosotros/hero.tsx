"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Container } from "@/components/ui/section";
import { nosotros } from "@/content/nosotros";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Hero de Nosotros: editorial a una columna, con la negacion arriba.
 *
 * El copy es una correccion ("no somos X, somos Y"), asi que la composicion la
 * respeta: la primera linea en tinta y la segunda en cyan, con la segunda
 * pesando mas. El kicker "Y la diferencia importa" va DEBAJO del titular, no
 * encima como un eyebrow, porque en el copy es una respuesta, no una etiqueta.
 */
export function NosotrosHero() {
  const { hero } = nosotros;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    gsap.from(gsap.utils.toArray("[data-reveal]", scope), {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out",
      immediateRender: true,
      stagger: 0.1,
    });
  });

  return (
    <section
      data-tone="light"
      className="relative isolate overflow-hidden bg-paper pt-[calc(var(--header-h)+clamp(2.5rem,6vw,4.5rem))] pb-section-sm"
    >
      <div aria-hidden="true" className="bg-dot-grid absolute inset-0 -z-20 opacity-60" />
      <div aria-hidden="true" className="bg-radial-wash absolute inset-0 -z-10" />
      <BrandArc
        placement="edge"
        tone="gradient"
        weight={2}
        opacity={0.4}
        draw
        className="inset-y-0 right-0 -z-10 h-full w-[clamp(70px,12vw,190px)]"
      />

      <Container width="wide">
        <div ref={scope}>
        <p data-reveal className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
          {hero.eyebrow}
        </p>

        {/* Sin `max-w`: la primera linea son 52 caracteres, que a 56px piden
            ~1.400px. Acotada a 24ch (463px) el titular se iba a cuatro lineas.
            A ancho de contenedor son tres, que es el limite. */}
        <h1 data-reveal className="mt-8 text-display-hero">
          <span className="block text-balance">{hero.titleLine1}</span>{" "}
          <span className="mt-1 block text-balance text-cyan-strong">
            {hero.titleLine2}
          </span>
        </h1>

        <p data-reveal className="mt-8 text-display-3 text-navy">{hero.kicker}</p>

        <p data-reveal className="measure-body mt-6 text-lead text-fg-muted">{hero.lead}</p>
        </div>
      </Container>
    </section>
  );
}
