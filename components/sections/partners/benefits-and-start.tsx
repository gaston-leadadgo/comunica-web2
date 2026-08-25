"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { partners } from "@/content/partners";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Los seis beneficios y los cuatro pasos de arranque.
 *
 * Beneficios: bento denso de 6 columnas con `grid-flow-dense`. Seis items en
 * `col-span-2` dan dos filas exactas de 6, sin celdas muertas.
 *
 * Arranque: cuatro pasos en fila horizontal unidos por una linea en degradado a
 * 100 grados, el angulo del manual. La home cuenta su metodologia con tarjetas
 * apiladas por scroll; aqui son solo cuatro pasos y apilarlos seria gastar media
 * pantalla en algo que se entiende de un vistazo.
 */
export function PartnersBenefitsAndStart() {
  const { benefits, start } = partners;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", scope);
    gsap.from(cells, {
      opacity: 0,
      y: 16,
      scale: 0.98,
      duration: 0.42,
      ease: "power2.out",
      immediateRender: true,
      stagger: { each: 0.05, from: "start", grid: "auto" },
      scrollTrigger: { trigger: scope, start: "top 80%", once: true },
    });
  });

  return (
    <section
      data-tone="light"
      className="relative isolate bg-paper-warm py-section"
    >
      <BrandArc
        placement="edge"
        tone="gradient"
        opacity={0.3}
        flip
        className="inset-y-0 left-0 -z-10 h-full w-[clamp(60px,10vw,150px)]"
      />

      <Container width="wide">
        <h2 className="max-w-[24ch] text-display-2 text-balance">
          {benefits.title}
        </h2>

        <div
          ref={scope}
          className="mt-12 grid grid-flow-dense grid-cols-1 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-6"
        >
          {benefits.items.map((b) => (
            <article
              key={b.title}
              data-cell
              className="flex min-w-0 flex-col bg-paper p-7 transition-colors hover:bg-paper-warm lg:col-span-2"
            >
              <span className="grid size-11 place-items-center rounded-md bg-navy/[0.06] text-navy">
                <Icon name={b.icon} size={19} />
              </span>
              <h3 className="mt-5 measure-card text-display-3">{b.title}</h3>
              <p className="measure-body mt-3 text-body-sm text-fg-muted">
                {b.description}
              </p>
            </article>
          ))}
        </div>

        {/* Como empezamos */}
        <div className="mt-20">
          <h2 className="text-display-2">{start.title}</h2>

          <ol className="relative mt-12 grid gap-8 lg:grid-cols-4">
            {/* La linea del proceso: degradado a 100 grados, como el manual */}
            <span
              aria-hidden="true"
              className="bg-brand-gradient absolute top-[1.375rem] left-0 hidden h-px w-full lg:block"
            />
            {start.steps.map((s) => (
              <li key={s.number} className="relative min-w-0">
                <span
                  className="relative grid size-11 place-items-center rounded-full border border-line bg-paper font-mono text-card-title text-navy"
                  data-tabular
                  aria-hidden="true"
                >
                  {s.number}
                </span>
                <h3 className="mt-5 text-card-title">{s.title}</h3>
                <p className="mt-2.5 text-body-sm text-fg-muted">{s.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Button
              href={start.cta.href}
              variant="navy"
              size="lg"
              iconRight={<Icon name="arrow-right" size={18} />}
            >
              {start.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
