"use client";

import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { nosotros } from "@/content/nosotros";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * "Confiable no es una palabra bonita. Es una forma de trabajar".
 *
 * Los cinco compromisos son verbos ("escuchar", "recomendar", "ejecutar", "dar la
 * cara", "seguir pensando"), asi que se numeran: leidos como una secuencia dicen
 * mas que como una lista de virtudes. La foto del tecnico con la responsable del
 * hotel va aqui porque es exactamente lo que el copy describe.
 */
export function NosotrosTrust() {
  const { trust } = nosotros;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-reveal]", { stagger: 0.1, start: "top 78%" });
  });

  return (
    <section data-tone="light" className="bg-paper py-section">
      <Container width="wide">
        <div ref={scope} className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div data-reveal className="min-w-0">
            <h2 className="max-w-[24ch] text-display-2 text-balance">
              {trust.title}
            </h2>
            <p className="measure-body mt-7 text-body text-fg-muted">
              {trust.lead}
            </p>

            <p className="mt-10 font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
              {trust.itemsLabel}
            </p>

            <ol className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2">
              {trust.items.map((item, i) => (
                <li
                  key={item}
                  className="flex min-w-0 flex-col gap-4 bg-paper-warm p-6 last:sm:col-span-2"
                >
                  <span
                    className="font-mono text-data text-cyan-ink-strong"
                    data-tabular
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-card-title">{item}</span>
                </li>
              ))}
            </ol>

            <p className="mt-9 flex items-start gap-3 text-display-3 text-cyan-strong">
              <Icon
                name="shield-check"
                size={22}
                className="mt-1 shrink-0 text-cyan-ink"
              />
              {trust.closing}
            </p>
          </div>

          <div data-reveal className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SmartImage
              image="nosotros-trust-escucha"
              sizes={SIZES.heroSplit}
              wrapperClassName="d-crop-l"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
