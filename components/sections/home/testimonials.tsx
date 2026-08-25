"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";
import { gsap, useBrandMotion } from "@/lib/gsap/use-brand-motion";
import { cn } from "@/lib/utils/cn";

/**
 * Carrusel de testimonios.
 *
 * Uno de los tres componentes que salieron en la randomizacion. Deliberadamente
 * no es una rejilla de tres tarjetas iguales: una sola cita a tamano grande pesa
 * mas que tres reducidas, y los retratos solapados de al lado dejan claro que hay
 * mas de una.
 *
 * El cambio de cita anima: sube 8px y sube de opacidad, `power2.out` en 0.35 s.
 * Antes el swap era instantaneo, y en un carrusel eso se lee como que el boton no
 * ha hecho nada. La entrada de toda la seccion al hacer scroll usa el mismo
 * `useBrandMotion`, pero con su propio trigger para no interferir con el cambio
 * de indice.
 *
 * Accesibilidad: los controles son botones reales con `aria-label`, la region
 * lleva `aria-roledescription` y el cambio se anuncia por `aria-live`. Nada
 * depende del hover.
 *
 * ATENCION: nombres, cargos y establecimientos vienen de la demo. Pendiente de
 * confirmar que son citas reales y publicables.
 */
export function Testimonials() {
  const items = home.testimonials.items;
  const [index, setIndex] = useState(0);
  const active = items[index];
  const quoteRef = useRef<HTMLDivElement>(null);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + items.length) % items.length);

  const scope = useBrandMotion<HTMLDivElement>(
    ({ gsap, scope, reduced }) => {
      if (reduced) return;
      gsap.from(scope, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        immediateRender: true,
        scrollTrigger: { trigger: scope, start: "top 82%", once: true },
      });
    },
    [],
  );

  // Crossfade del cambio de cita. No usa `useBrandMotion`: esa animacion es de
  // scroll-entrada (un `useGSAP` con su propio scope); esta es un cambio de
  // estado por clic, mas cerca de un `useEffect` con `gsap` a secas.
  useEffect(() => {
    if (!quoteRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(quoteRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.35,
      ease: "power2.out",
      immediateRender: true,
    });
  }, [index]);

  return (
    <section data-tone="light" className="bg-paper py-section">
      <Container>
        <div
          ref={scope}
          role="group"
          aria-roledescription="carrusel"
          aria-label={home.testimonials.label}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
              {home.testimonials.label}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Testimonio anterior"
                className="grid size-11 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <Icon name="arrow-right" size={17} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Testimonio siguiente"
                className="grid size-11 place-items-center rounded-full border border-line text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <Icon name="arrow-right" size={17} />
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-center">
            {/* Retratos solapados: el activo al frente y a tamano completo */}
            <div className="flex items-center lg:flex-col lg:items-start lg:gap-0">
              {items.map((t, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver testimonio de ${t.name}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative grid shrink-0 place-items-center rounded-full font-display font-bold transition-all duration-300",
                      isActive
                        ? "size-20 bg-navy text-white shadow-md lg:size-24"
                        : "size-14 bg-paper-warm-2 text-navy/60 hover:text-navy lg:size-16",
                      i > 0 && "-ml-4 lg:-mt-4 lg:ml-0",
                    )}
                    style={{ zIndex: isActive ? 10 : items.length - i }}
                  >
                    <span className="text-body">{t.initials}</span>
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="bg-brand-gradient absolute -inset-1 -z-10 rounded-full"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* La cita */}
            <figure ref={quoteRef} className="min-w-0" aria-live="polite">
              <span
                aria-hidden="true"
                className="block font-display text-[4rem] leading-none text-cyan/25"
              >
                &laquo;
              </span>
              <blockquote className="-mt-6">
                <p className="max-w-[42ch] text-display-3 text-fg text-balance">
                  {active.quote}
                </p>
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-6">
                <p className="text-card-title">{active.name}</p>
                <p className="mt-1 font-mono text-data text-fg-muted">
                  {active.role}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
