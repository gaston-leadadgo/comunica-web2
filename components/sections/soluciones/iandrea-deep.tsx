"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { soluciones } from "@/content/soluciones";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * El bloque largo de iAndrea.
 *
 * La home presenta el producto; esta es la ficha.
 *
 * Las cuatro llamadas simultaneas usaban un scrub ("opacity 0.22 -> 1" atado al
 * scroll) que en la practica no llegaba a completarse: `scrub: 0.8` anade una
 * inercia de 0,8 s, y como la seccion entera es alta (titulo + llamadas +
 * capacidades + cierre), para cuando el usuario ya habia visto el bloque
 * completo, la interpolacion todavia iba a medias — verificado midiendo
 * `ScrollTrigger.isActive` contra el estado real de opacidad. Se cambia al
 * mismo patron que el resto del sitio: reves de una vez al entrar, con
 * `once:true`, sin scrub. Nunca se queda a medias.
 *
 * Las ocho capacidades van en rejilla de cuatro columnas con medianiles de 1px:
 * 8 = 4x2 exacto, sin celdas muertas.
 */
export function SolucionesIandrea() {
  const { iandrea } = soluciones;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    gsap.from(gsap.utils.toArray("[data-reveal-l]", scope), {
      opacity: 0,
      y: 22,
      duration: 0.6,
      ease: "power3.out",
      immediateRender: true,
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 75%", once: true },
    });

    const calls = gsap.utils.toArray<HTMLElement>("[data-call]", scope);
    if (calls.length) {
      gsap.from(calls, {
        opacity: 0,
        x: -16,
        duration: 0.45,
        ease: "power2.out",
        immediateRender: true,
        stagger: 0.09,
        scrollTrigger: { trigger: calls[0], start: "top 78%", once: true },
      });
    }

    const problem = scope.querySelector("[data-problem]");
    if (problem) {
      gsap.from(problem, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
        immediateRender: true,
        delay: 0.25,
        scrollTrigger: { trigger: problem, start: "top 85%", once: true },
      });
    }

    const features = gsap.utils.toArray<HTMLElement>("[data-feature]", scope);
    if (features.length) {
      gsap.from(features, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        immediateRender: true,
        stagger: { each: 0.06, from: "start", grid: "auto" },
        scrollTrigger: { trigger: features[0], start: "top 85%", once: true },
      });
    }

    const closing = gsap.utils.toArray<HTMLElement>("[data-reveal-close]", scope);
    if (closing.length) {
      gsap.from(closing, {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: "power2.out",
        immediateRender: true,
        stagger: 0.1,
        scrollTrigger: { trigger: closing[0], start: "top 88%", once: true },
      });
    }
  });

  return (
    <section
      id="iandrea"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-navy py-section text-fg-inverse"
    >
      <BrandArc
        placement="edge"
        tone="white"
        opacity={0.4}
        flip
        className="inset-y-0 left-0 -z-10 h-full w-[clamp(70px,12vw,180px)]"
      />

      <Container width="wide">
      <div ref={scope}>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="min-w-0">
            <h2 data-reveal-l className="text-display-2 text-white">
              {iandrea.title}
            </h2>
            <p data-reveal-l className="mt-3 max-w-[30ch] text-display-3 text-cyan">
              {iandrea.subtitle}
            </p>

            <div data-reveal-l className="mt-10 flex flex-col gap-4">
              {iandrea.definition.map((p, i) => (
                <p
                  key={p}
                  className={
                    i === 0
                      ? "measure-body text-display-3 text-white"
                      : "measure-body text-body-sm text-fg-inverse-muted"
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div data-reveal-l className="mt-10">
              <Button
                href={iandrea.cta.href}
                variant="cyan"
                size="lg"
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                {iandrea.cta.label}
              </Button>
            </div>
          </div>

          {/* Las cuatro llamadas, en cascada de entrada */}
          <div className="min-w-0">
            <ul className="flex flex-col gap-px overflow-hidden rounded-xl bg-white/12">
              {iandrea.calls.map((c) => (
                <li
                  key={c}
                  data-call
                  className="flex min-w-0 items-center gap-4 bg-navy p-5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
                    <Icon name="phone-call" size={16} />
                  </span>
                  <span className="text-body-sm text-white">{c}</span>
                </li>
              ))}
            </ul>

            <p
              data-problem
              className="rounded-shield mt-6 border border-cyan/25 bg-cyan/[0.06] p-6 text-display-3 text-white"
            >
              {iandrea.problem}
            </p>
          </div>
        </div>

        {/* Las ocho capacidades: 4x2 exacto */}
        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {iandrea.features.map((f) => (
            <li key={f.title} data-feature className="min-w-0 bg-navy p-7">
              <span className="grid size-10 place-items-center rounded-md bg-white/[0.06] text-cyan">
                <Icon name={f.icon} size={18} />
              </span>
              <h3 className="mt-5 text-card-title text-white">{f.title}</h3>
              <p className="mt-3 text-small text-fg-inverse-muted">
                {f.description}
              </p>
            </li>
          ))}
        </ul>

        {/* Cierre */}
        <div className="mt-16 grid gap-x-16 gap-y-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div data-reveal-close className="flex flex-col gap-4">
            {iandrea.closing.map((p) => (
              <p key={p} className="measure-body text-body-sm text-fg-inverse-muted">
                {p}
              </p>
            ))}
          </div>
          <p data-reveal-close className="text-display-3 text-cyan">
            {iandrea.motto}
          </p>
        </div>
      </div>
      </Container>
    </section>
  );
}
