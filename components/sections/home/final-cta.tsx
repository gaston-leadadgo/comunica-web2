"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * CTA de cierre. Accion, en terminos AIDA.
 *
 * Fondo: degradado oficial a 100 grados con velo navy al 40 %
 * (`bg-brand-gradient-veiled`). Medido: sin velo, el bloque de texto centrado
 * cubre del 21 % al 78 % del recorrido del degradado, asi que su mitad derecha
 * cae sobre color casi cyan y el blanco baja a 2,97:1. Con velo, el punto mas
 * claro es #0073AB y el blanco da 5,22:1.
 *
 * Por eso el texto va en blanco solido: blanco al 80 % cae a 3,91:1 y el cyan de
 * marca da 1,76:1. El acento cyan lo pone el boton, con texto en tinta.
 */
export function FinalCta() {
  const { finalCta } = home;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-reveal]", { stagger: 0.1, start: "top 82%" });
  });

  return (
    <section
      data-tone="dark"
      className="bg-brand-gradient-veiled relative isolate overflow-hidden py-section-lg text-white"
    >
      <BrandArc
        placement="focus"
        tone="white"
        weight={3}
        opacity={0.3}
        className="-top-16 right-0 size-[min(420px,50vw)]"
      />

      <Container>
        <div ref={scope} className="mx-auto max-w-[54rem] text-center">
          <h2 data-reveal className="text-display-2 text-balance">
            <HotelText>{finalCta.title}</HotelText>
          </h2>

          <div data-reveal className="mx-auto mt-9 flex max-w-[42ch] flex-col gap-2">
            {finalCta.body.map((p) => (
              <p key={p} className="text-lead text-white">
                {p}
              </p>
            ))}
            <p className="mt-2 text-display-3 text-white">{finalCta.highlight}</p>
          </div>

          <div
            data-reveal
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              href={finalCta.ctas[0].href}
              variant="cyan"
              size="lg"
              iconRight={<Icon name="arrow-right" size={18} />}
              className="w-full sm:w-auto"
            >
              {finalCta.ctas[0].label}
            </Button>
            <Button
              href={finalCta.ctas[1].href}
              variant="white"
              size="lg"
              className="w-full sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="file-text" size={17} />
                {finalCta.ctas[1].label}
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
