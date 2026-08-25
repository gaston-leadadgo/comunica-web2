"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { partners } from "@/content/partners";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Hero de Partners, en navy.
 *
 * Es la unica pagina que abre en oscuro. No es capricho: el lector de Partners no
 * es un hotelero, es un operador regional o un comercial independiente, y el
 * cambio de superficie desde la primera pantalla le dice que esta en otra
 * conversacion. Tambien es lo que impide que las cuatro paginas del sitio abran
 * todas con el mismo hero claro.
 */
export function PartnersHero() {
  const { hero } = partners;

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
      data-tone="dark"
      className="relative isolate overflow-hidden bg-navy pt-[calc(var(--header-h)+clamp(2.5rem,6vw,4.5rem))] pb-section-sm text-fg-inverse"
    >
      <div aria-hidden="true" className="bg-radial-wash absolute inset-0 -z-10 opacity-70" />
      <BrandArc
        placement="edge"
        tone="white"
        weight={2}
        opacity={0.5}
        draw
        className="inset-y-0 right-0 -z-10 h-full w-[clamp(70px,12vw,190px)]"
      />

      <Container width="wide">
        <div ref={scope}>
        <p data-reveal className="font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
          {hero.eyebrow}
        </p>

        {/* El titular a ancho completo, no en columna: en una de 704px se partia
            en cuatro lineas. Es el mismo ajuste que en el hero de Soluciones. */}
        <h1 data-reveal className="mt-8 max-w-[70rem] text-display-hero text-white">
          <span className="block text-balance">{hero.titleLine1}</span>{" "}
          <span className="mt-1 block text-balance text-cyan">
            {hero.titleLine2}
          </span>
        </h1>

        <div data-reveal className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-end">
          <div className="flex min-w-0 flex-col gap-4">
            {hero.body.map((p) => (
              <p key={p} className="measure-body text-body-sm text-fg-inverse-muted">
                {p}
              </p>
            ))}
          </div>

          <div className="min-w-0">
            <p className="border-l-2 border-cyan pl-5 text-display-3 text-white">
              {hero.highlight}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={hero.cta.href}
                size="lg"
                variant="cyan"
                iconRight={<Icon name="arrow-right" size={18} />}
                className="w-full sm:w-auto"
              >
                {hero.cta.label}
              </Button>
              {/* Segunda puerta, para quien ya trabaja con nosotros. En
                  `outline`, que sobre `data-tone=dark` se resuelve solo a borde
                  y texto blancos. */}
              <Button
                href={hero.secondaryCta.href}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="shield-check" size={17} />
                  {hero.secondaryCta.label}
                </span>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
