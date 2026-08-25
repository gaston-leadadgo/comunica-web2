"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { Icon } from "@/components/ui/icon";
import type { Cta } from "@/content/schema";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * CTA de cierre de pagina interior. Una sola implementacion para Soluciones,
 * Nosotros y Partners: las tres cierran con el mismo patron (titular, dos o tres
 * frases, remate y llamada), asi que no hay razon para tres componentes.
 *
 * Fondo: degradado oficial a 100 grados con velo navy al 40 % (ver
 * `bg-brand-gradient-veiled` en globals.css). Sin el velo, la mitad derecha del
 * bloque de texto cae sobre color casi cyan y el blanco da 2,97:1.
 *
 * Consecuencia: aqui el texto va en blanco solido, nunca traslucido ni cyan. El
 * acento cyan lo pone el boton, que lleva texto en tinta (5,68:1).
 */
export function ClosingCta({
  title,
  body,
  highlight,
  cta,
  secondary,
}: {
  title: string;
  body: readonly string[];
  highlight?: string;
  cta: Cta;
  secondary?: Cta;
}) {
  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-reveal]", { stagger: 0.1, start: "top 85%" });
  });

  return (
    <section
      data-tone="dark"
      className="bg-brand-gradient-veiled relative isolate overflow-hidden py-section text-white"
    >
      <BrandArc
        placement="focus"
        tone="white"
        weight={3}
        opacity={0.3}
        className="-top-16 right-0 size-[min(420px,50vw)]"
      />

      <Container>
        <div ref={scope} className="mx-auto max-w-[52rem] text-center">
          <h2 data-reveal className="text-display-2 text-balance">
            <HotelText>{title}</HotelText>
          </h2>

          <div data-reveal className="mx-auto mt-8 flex max-w-[46ch] flex-col gap-2">
            {body.map((p) => (
              <p key={p} className="text-lead text-white">
                {p}
              </p>
            ))}
            {highlight ? (
              <p className="mt-2 text-display-3 text-white">{highlight}</p>
            ) : null}
          </div>

          <div
            data-reveal
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              href={cta.href}
              variant="cyan"
              size="lg"
              iconRight={<Icon name="arrow-right" size={18} />}
              className="w-full sm:w-auto"
            >
              {cta.label}
            </Button>
            {secondary ? (
              <Button
                href={secondary.href}
                variant="white"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
