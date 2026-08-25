"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { Icon } from "@/components/ui/icon";
import { soluciones } from "@/content/soluciones";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Hero de Soluciones: partido editorial, alineado a la izquierda.
 *
 * Distinto del hero de la home a proposito. Alli el titular va centrado a ancho
 * masivo porque es la portada; aqui el lector ya ha entrado y lo que necesita es
 * orientarse, asi que el titular ocupa la columna izquierda y el argumento se lee
 * al lado, en la derecha. Dos paginas con el mismo hero centrado se confunden.
 *
 * Entra al cargar, no al hacer scroll: es lo primero que se ve.
 */
export function SolucionesHero() {
  const { hero } = soluciones;

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
      <div aria-hidden="true" className="bg-radial-wash absolute inset-0 -z-10" />
      <BrandArc
        placement="edge"
        tone="gradient"
        weight={2}
        opacity={0.4}
        draw
        className="inset-y-0 right-0 -z-10 h-full w-[clamp(70px,12vw,190px)]"
      />

      <Container width="wide" className="relative">
        <div ref={scope}>
        <p data-reveal className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
          {hero.eyebrow}
        </p>

        {/* El titular ocupa el ancho completo, no una columna.
            Medido: la segunda linea son 45 caracteres, que a 56px piden ~1.210px.
            En una columna de 736px se partia en tres y el titular se iba a cuatro
            lineas. A ancho completo son dos, que es el limite. El texto sigue
            alineado a la izquierda, que es lo que distingue esta pagina del hero
            centrado de la home. */}
        <h1 data-reveal className="mt-8 max-w-[76rem] text-display-hero">
          <span className="block text-balance">{hero.titleLine1}</span>{" "}
          <span className="mt-1 block text-balance text-cyan-strong">
            <HotelText>{hero.titleLine2}</HotelText>
          </span>
        </h1>

        <div data-reveal className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div className="flex min-w-0 flex-col gap-4">
            {hero.body.map((p) => (
              <p key={p} className="measure-body text-body text-fg-muted">
                {p}
              </p>
            ))}
          </div>

          <div className="min-w-0">
            <p className="border-l-2 border-cyan pl-5 text-display-3 text-navy">
              {hero.highlight}
            </p>

            <div className="mt-8">
              <Button
                href={hero.cta.href}
                size="lg"
                variant="navy"
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                {hero.cta.label}
              </Button>
            </div>
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
