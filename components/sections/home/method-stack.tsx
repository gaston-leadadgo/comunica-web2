"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { home } from "@/content/home";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Metodologia en seis pasos, con apilado de tarjetas.
 *
 * Es el otro paradigma GSAP de la randomizacion, y es el unico `pin` real de la
 * pagina. Encaja con el copy porque el proceso es secuencial y acumulativo:
 * "Hablamos -> Revisamos -> Diagnosticamos -> Proponemos -> Migramos -> Nos
 * quedamos". Las tarjetas se apilan una sobre otra en vez de desfilar, de modo que
 * al final las seis quedan visibles con un desfase de unos pocos pixeles: el
 * proceso completo, no seis pasos sueltos.
 *
 * Implementacion: cada tarjeta es `position: sticky` con un `top` escalonado, y
 * GSAP solo anade la escala y la atenuacion de las que quedan detras. Si el JS
 * falla, el apilado sigue funcionando por CSS.
 *
 * En movil no se apila: seis tarjetas superpuestas en 375px son ilegibles.
 */
export function MethodStack() {
  const { method } = home;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", scope);

      cards.forEach((card, i) => {
        // La ultima no se atenua: es la que queda arriba del todo.
        if (i === cards.length - 1) return;

        // Solo escala. El `filter: brightness(0.93)` que habia aqui antes
        // oscurecia la tarjeta ENTERA, texto incluido: el cuerpo apagado
        // (`fg-muted`, ya de por si al 6,36:1) viraba a casi negro y dejaba de
        // leerse justo mientras la tarjeta seguia en pantalla. El retroceso lo
        // marca ahora la escala, que no toca el contraste del texto.
        gsap.to(card, {
          scale: 1 - (cards.length - 1 - i) * 0.014,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 92%",
            end: "top 42%",
            scrub: 1,
          },
        });
      });
    });

    return () => mm.kill();
  });

  return (
    <section
      data-tone="light"
      className="relative isolate bg-paper py-section"
    >
      <BrandArc
        placement="edge"
        tone="gradient"
        opacity={0.35}
        flip
        className="inset-y-0 left-0 -z-10 h-full w-[clamp(60px,10vw,150px)]"
      />

      <Container>
        {/* La pregunta manda y la promesa la responde debajo. El subtitulo baja
            a `display-3` porque a `display-2` las dos competirian y la seccion
            tendria dos titulares en lugar de uno. */}
        <h2 className="mx-auto max-w-[26ch] text-center text-display-2 text-balance">
          {method.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[34ch] text-center text-display-3 text-fg-muted text-balance">
          <HotelText>{method.subtitle}</HotelText>
        </p>

        <div ref={scope} className="mt-16 flex flex-col gap-6 lg:mt-24 lg:gap-0">
          {method.steps.map((step, i) => (
            <article
              key={step.number}
              data-card
              className="rounded-shield border border-line bg-paper p-8 shadow-sm lg:sticky lg:p-12"
              style={{
                // Desfase escalonado: cada tarjeta se detiene 18px mas abajo.
                top: `calc(var(--header-h) + 3rem + ${i * 18}px)`,
                // Origen arriba para que el escalado no la despegue del apilado.
                transformOrigin: "top center",
                zIndex: i + 1,
              }}
            >
              <div className="grid gap-6 lg:grid-cols-[8rem_1fr] lg:gap-12">
                <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
                  {/* El numero iba en `text-cyan/25`: sobre papel blanco eso da
                      1,5:1 y en la practica no se veia. Pasa al cyan de tinta,
                      que es el mismo matiz de marca en version legible. */}
                  <span
                    className="font-mono text-metric leading-none text-cyan-ink"
                    data-tabular
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="bg-brand-gradient hidden h-px w-12 lg:block"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-display-3">{step.title}</h3>
                  <p className="measure-body mt-4 text-body text-fg-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
