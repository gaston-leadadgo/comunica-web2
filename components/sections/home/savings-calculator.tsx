"use client";

import { useId, useState } from "react";

import { BrandArc } from "@/components/brand/brand-arc";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { calculator, home } from "@/content/home";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Calculadora de potencial de optimizacion.
 *
 * La formula es la de la demo aprobada: 18 % a 35 % del gasto mensual declarado.
 * Vive en `content/home.ts` para que el rango se cambie en un solo sitio y para
 * que la pagina de contacto pueda recalcular exactamente lo mismo.
 *
 * Accesibilidad de los deslizadores: `<input type="range">` nativo con label
 * visible y `aria-valuetext` en unidades humanas ("60 habitaciones", "1.500 euros
 * al mes"). Un range sin `aria-valuetext` anuncia solo el numero pelado.
 */

const eur = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function SavingsCalculator() {
  const c = home.calculator;
  const roomsId = useId();
  const spendId = useId();

  const [rooms, setRooms] = useState<number>(calculator.rooms.default);
  const [spend, setSpend] = useState<number>(calculator.spend.default);

  const minMonthly = Math.round(spend * calculator.minRatio);
  const maxMonthly = Math.round(spend * calculator.maxRatio);

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-reveal]", { stagger: 0.1, start: "top 80%" });
  });

  return (
    <section
      id="calculadora"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-abyss py-section text-fg-inverse"
    >
      <div
        aria-hidden="true"
        className="bg-radial-wash absolute inset-0 -z-10 opacity-80"
      />
      <BrandArc
        placement="edge"
        tone="white"
        opacity={0.5}
        className="inset-y-0 right-0 -z-10 h-full w-[clamp(70px,12vw,180px)]"
      />

      <Container>
      <div ref={scope}>
        <div data-reveal className="mx-auto max-w-[52rem] text-center">
          <h2 className="text-display-2 text-balance">{c.title}</h2>
          <p className="measure-lead mx-auto mt-7 text-lead text-fg-inverse-muted">
            {c.lead}
          </p>
          <p className="mt-6 text-display-3 text-cyan">{c.highlight}</p>
        </div>

        <div data-reveal className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/12 lg:grid-cols-2">
          {/* Controles */}
          <div className="min-w-0 bg-abyss/80 p-8 lg:p-12">
            <div>
              <label
                htmlFor={roomsId}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="text-card-title text-white">{c.roomsLabel}</span>
                <span
                  className="font-mono text-display-3 text-cyan"
                  data-tabular
                >
                  {rooms}
                </span>
              </label>
              <input
                id={roomsId}
                type="range"
                min={calculator.rooms.min}
                max={calculator.rooms.max}
                step={calculator.rooms.step}
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                aria-valuetext={`${rooms} habitaciones`}
                className="mt-5 w-full accent-cyan"
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-fg-inverse-muted">
                {c.roomsTicks.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <label
                htmlFor={spendId}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="text-card-title text-white">{c.spendLabel}</span>
                <span
                  className="font-mono text-display-3 text-cyan whitespace-nowrap"
                  data-tabular
                >
                  {eur.format(spend)}
                </span>
              </label>
              <p className="mt-1 font-mono text-data text-fg-inverse-muted">
                {c.spendHint}
              </p>
              <input
                id={spendId}
                type="range"
                min={calculator.spend.min}
                max={calculator.spend.max}
                step={calculator.spend.step}
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                aria-valuetext={`${spend} euros al mes`}
                className="mt-5 w-full accent-cyan"
              />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-fg-inverse-muted">
                {c.spendTicks.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <p className="mt-10 measure-body text-body-sm text-fg-inverse-muted">
              {c.sliderHint}
            </p>
          </div>

          {/* Resultado */}
          <div className="flex min-w-0 flex-col justify-between bg-navy p-8 lg:p-12">
            <div>
              <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
                {c.resultLabel}
              </p>

              <p
                className="mt-7 text-metric text-white"
                data-tabular
                aria-live="polite"
              >
                {eur.format(minMonthly)}
                <span className="text-cyan"> - </span>
                {eur.format(maxMonthly)}
              </p>
              <p className="mt-1 font-mono text-data text-fg-inverse-muted">
                {c.perMonth}
              </p>

              <p className="mt-8 text-display-3 text-cyan" data-tabular>
                {eur.format(minMonthly * 12)} - {eur.format(maxMonthly * 12)}
                <span className="ml-2 font-mono text-data text-fg-inverse-muted">
                  {c.perYear}
                </span>
              </p>
            </div>

            <div className="mt-12 border-t border-white/12 pt-8">
              <p className="measure-body text-body-sm text-fg-inverse-muted">
                {c.disclaimer}
              </p>
              <p className="mt-2 measure-body text-[13px] text-fg-inverse-muted/80">
                {c.disclaimerDetail}
              </p>
            </div>
          </div>
        </div>

        {/* CTA de la calculadora */}
        <div data-reveal className="mt-14 flex flex-col items-center gap-6 text-center">
          <p className="max-w-[30ch] text-display-3 text-white text-balance">
            {c.ctaTitle}
          </p>
          <p className="measure-lead text-body text-fg-inverse-muted">
            {c.ctaLead}
          </p>
          <Button
            href={`${c.cta.href}&habitaciones=${rooms}&gasto=${spend}`}
            variant="cyan"
            size="lg"
            iconRight={<Icon name="arrow-right" size={18} />}
          >
            {c.cta.label}
          </Button>
        </div>
      </div>
      </Container>
    </section>
  );
}
