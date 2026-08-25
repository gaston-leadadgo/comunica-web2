"use client";

import { BrandSymbol } from "@/components/brand/logo";
import { Container } from "@/components/ui/section";
import { home } from "@/content/home";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Banda de credibilidad + marquee de grupos hoteleros.
 *
 * Va aqui y no dentro del hero: meter cifras crudas en el hero lo carga y le
 * quita aire. Como bloque propio, la cifra golpea mas.
 *
 * El marquee duplica la lista en el markup y desplaza un -50 %, que es la unica
 * forma de que el bucle sea continuo sin salto. El segundo juego va
 * `aria-hidden` para que un lector de pantalla no lea veinte nombres. Esa cinta
 * ya se mueve sola por CSS; lo que le faltaba era la entrada de la cifra.
 *
 * Fondo en navy 540 C (el azul del manual) y no en Process Black: es la banda
 * que sostiene la prueba de cartera, y el azul corporativo la ata a la marca
 * mejor que un negro neutro. El blanco sobre navy da 13,46:1 y el cyan 4,53:1,
 * asi que ambos siguen pasando AA.
 *
 * ATENCION: los nombres son marcas de terceros y afirmaciones de cartera de
 * cliente. No se publican sin autorizacion por escrito (ver content/home.ts).
 */
export function CredibilityBand() {
  const { credibility } = home;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-claim],[data-marquee]", {
      stagger: 0.14,
      start: "top 85%",
    });
  });

  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden bg-navy py-section-sm text-fg-inverse"
    >
      <Container width="wide" className="relative">
        <div ref={scope} className="flex flex-col items-center gap-10">
          <p
            data-claim
            className="max-w-[26ch] text-center text-display-3 text-balance sm:max-w-none"
          >
            {credibility.claim.split(" · ").map((part, i, arr) => (
              <span key={part}>
                <span className={i === 2 ? "text-cyan" : undefined} data-tabular>
                  {part}
                </span>
                {i < arr.length - 1 ? (
                  <span aria-hidden="true" className="mx-3 text-white/25">
                    /
                  </span>
                ) : null}
              </span>
            ))}
          </p>

          <div data-marquee className="w-full">
            <p className="text-center font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
              {credibility.logosLabel}
            </p>

            <div
              className="relative mt-6 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              }}
            >
              <div className="animate-marquee flex w-max items-center">
                {[false, true].map((isClone) => (
                  <ul
                    key={String(isClone)}
                    aria-hidden={isClone || undefined}
                    className="flex shrink-0 items-center"
                  >
                    {credibility.logos.map((name) => (
                      <li
                        key={name}
                        className="flex items-center gap-3 border-r border-white/10 px-8"
                      >
                        <BrandSymbol
                          gradient={false}
                          size={16}
                          className="shrink-0 text-cyan/70"
                        />
                        <span className="text-body-sm font-medium whitespace-nowrap text-white/80">
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
