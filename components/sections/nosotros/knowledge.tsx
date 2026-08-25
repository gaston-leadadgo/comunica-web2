"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { nosotros } from "@/content/nosotros";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * "Sabemos de tecnologia y tambien donde tiene que funcionar".
 *
 * Los cinco items son situaciones de la operativa hotelera, no caracteristicas de
 * producto, asi que van como una lista de comprobacion con hairlines y no como
 * tarjetas: una tarjeta convierte cada frase en un titular y aqui lo que importa
 * es que se lean del tirón, en cascada.
 *
 * La conclusion va en isla navy con el enfasis dentro. El copy pone ahi la unica
 * etiqueta que le importa a la marca ("Especialistas en hoteles"), asi que se
 * compone como remate, no como un parrafo mas.
 */
export function NosotrosKnowledge() {
  const { knowledge } = nosotros;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-reveal]", { stagger: 0.12, start: "top 80%" });
  });

  return (
    <section data-tone="light" className="bg-paper-warm py-section">
      <Container>
      <div ref={scope}>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <h2 data-reveal className="max-w-[22ch] text-display-2 text-balance">
            {knowledge.title}
          </h2>

          <div data-reveal className="min-w-0">
            <ul className="flex flex-col">
              {knowledge.items.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-line py-4 first:border-t"
                >
                  <span
                    className="mt-1 shrink-0 font-mono text-[0.6875rem] text-cyan-ink-strong"
                    data-tabular
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    name="check"
                    size={16}
                    className="mt-0.5 shrink-0 text-positive"
                  />
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4">
              {knowledge.body.map((p, i) => (
                <p
                  key={p}
                  className={
                    i === knowledge.body.length - 1
                      ? "measure-body text-display-3 text-navy"
                      : "measure-body text-body-sm text-fg-muted"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Banner de conclusion.
            ---------------------------------------------------------------
            Llevaba el remate del argumento ("Especialistas en hoteles") y
            ninguna salida: el lector llegaba al punto mas convencido de la
            seccion y no tenia donde pulsar. Se le añade el CTA, en la misma
            fila para no alargar el bloque. */}
        <div
          data-tone="dark"
          data-reveal
          className="rounded-shield mt-14 grid gap-x-12 gap-y-8 bg-navy p-8 text-fg-inverse lg:grid-cols-[1fr_auto] lg:items-end lg:p-12"
        >
          <div className="min-w-0">
            <p className="measure-lead text-body-sm text-fg-inverse-muted">
              {knowledge.conclusion.before}
            </p>
            <p className="mt-3 text-display-2 text-cyan">
              {knowledge.conclusion.emphasis}
            </p>
          </div>

          <Button
            href={knowledge.conclusion.cta.href}
            variant="cyan"
            size="lg"
            iconRight={<Icon name="arrow-right" size={18} />}
            className="w-full sm:w-auto"
          >
            {knowledge.conclusion.cta.label}
          </Button>
        </div>
      </div>
      </Container>
    </section>
  );
}
