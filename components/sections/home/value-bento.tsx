"use client";

import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Container } from "@/components/ui/section";
import { MarkPhrase } from "@/components/ui/hotel-text";
import { home } from "@/content/home";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Bento sin huecos de la propuesta de valor.
 *
 * Verificacion de densidad: rejilla de 6 columnas, `grid-flow-dense`.
 *   fila 1: piezas+diferencia (col-span-4) + imagen (col-span-2)
 *   fila 2: tres pilares (col-span-2 cada uno)
 *   fila 3: lema (col-span-6)
 * Total ocupado = 4+2 | 2+2+2 | 6. Cero celdas muertas.
 *
 * Sin `row-span`: la primera version forzaba la imagen a dos filas con una
 * `min-height` propia, y como el texto de al lado (pills + frase) nunca tenia
 * tanto contenido, el sobrante quedaba como un vacio en medio de la tarjeta —
 * moverlo con `justify-between` solo lo desplazo, no lo quito. Aqui la imagen
 * vive en una sola fila con su propio `aspect-ratio` (cuadrado), y la fila
 * completa toma la altura que de verdad necesita el contenido mas alto de los
 * dos, sin nada forzando una altura de mas.
 *
 * Medianiles de 1px en lugar de tarjetas flotando separadas: asi la rejilla se
 * lee como un sistema y no como una lista de cajas.
 */
export function ValueBento() {
  const { value } = home;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", scope);
    if (!cells.length) return;
    gsap.from(cells, {
      opacity: 0,
      y: 22,
      scale: 0.97,
      duration: 0.55,
      ease: "power2.out",
      immediateRender: true,
      stagger: { each: 0.06, from: "start", grid: "auto" },
      scrollTrigger: { trigger: scope, start: "top 78%", once: true },
    });
  });

  return (
    <section data-tone="light" className="bg-paper-warm py-section">
      <Container width="wide">
        <div className="mx-auto max-w-[54rem] text-center">
          <h2 className="text-display-2 text-balance">{value.title}</h2>
          <p className="measure-lead mx-auto mt-7 text-lead text-fg-muted">
            {value.lead}
          </p>
        </div>

        <div
          ref={scope}
          className="mt-16 grid grid-flow-dense grid-cols-1 gap-px overflow-hidden rounded-xl bg-line md:grid-cols-6"
        >
          {/* Piezas + diferencia juntas, una sola fila con la imagen */}
          <div
            data-cell
            className="flex min-w-0 flex-col justify-center gap-8 bg-paper p-8 md:col-span-4 lg:p-12"
          >
            <div>
              <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
                {value.capabilitiesLabel}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                {value.capabilitiesLine.split(". ").map((cap) => (
                  <li
                    key={cap}
                    className="rounded-full border border-line px-4 py-2 font-mono text-data text-navy"
                  >
                    {cap.replace(/\.$/, "")}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-8">
              <p className="text-body text-fg-muted">
                <MarkPhrase phrase={value.differenceLabel}>
                  {value.differenceIntro}
                </MarkPhrase>
              </p>
              <p className="mt-3 max-w-[34ch] text-display-3 text-navy text-balance">
                {value.differenceHighlight}
              </p>
            </div>
          </div>

          {/* Imagen: recorte propio 5:4, no el 4:5 vertical del archivo real.
              El bodegon esta generado en 1400x1750 (retrato); a este ancho de
              columna (2 de 6) eso da una foto mas alta que el texto de al
              lado, forzando la fila entera. Un recorte mas horizontal deja la
              fila con la altura que el texto realmente necesita. */}
          <div
            data-cell
            className="relative flex min-w-0 items-center justify-center bg-paper md:col-span-2"
          >
            <SmartImage
              image="home-catalog-keycard-still"
              sizes={SIZES.grid3}
              decorative
              wrapperClassName="!aspect-[5/4] w-full"
            />
          </div>

          {/* Tres pilares: 2+2+2 = 6, fila exacta */}
          {value.pillars.map((p, i) => (
            <div
              key={p}
              data-cell
              className="flex min-w-0 flex-col justify-between gap-8 bg-paper p-8 md:col-span-2"
            >
              <span
                className="font-mono text-data text-cyan-ink-strong"
                data-tabular
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="measure-card text-card-title">{p}</p>
            </div>
          ))}

          {/* Lema a todo el ancho: cierra la rejilla sin dejar hueco */}
          <div data-cell className="bg-brand-gradient-flip min-w-0 p-8 text-center md:col-span-6 lg:p-10">
            <p className="text-display-3 text-white">{value.motto}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
