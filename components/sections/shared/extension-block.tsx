"use client";

import { QrMotif } from "@/components/brand/qr-motif";
import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Extension Dinamica, en una sola vista.
 *
 * Rehecha por peticion de cliente: antes media 1,43 viewports, asi que al llegar
 * al flujo QR ya se habia perdido de vista el titulo. Cambios y por que:
 *
 * - Fuera la columna fija y el scrub de las tarjetas. Una galeria de pin partido
 *   necesita recorrido de scroll para tener sentido; si la seccion tiene que
 *   caber en una pantalla, no hay recorrido que gastar. Mantener el sticky
 *   habria sido decorar un patron que ya no aplica.
 * - Los tres pasos pasan de columna apilada a tira horizontal de tres celdas.
 *   Es la misma secuencia, contada en el eje que sobra en escritorio.
 * - La foto pasa de 4:3 a 16:9. A 4:3 la imagen sola se llevaba 480px de los
 *   756 disponibles.
 * - Los parrafos van a 14px (`text-body-sm`, que ahora existe de verdad) y el
 *   cierre a 13px.
 *
 * Solo queda un movimiento: la tira de pasos entra una vez con stagger. Sin
 * scrub, porque la seccion completa cabe en pantalla y un scrub dejaria los
 * pasos a medio opacar sin nada de scroll que los complete.
 */
export function ExtensionBlock() {
  const { extension } = home;
  const m = extension.mockup;

  const steps = [
    { key: "habitacion", label: m.room, detail: m.guestStatus, icon: "hotel" as const },
    { key: "qr", label: m.qrLabel, detail: m.qrAction, icon: "smartphone" as const },
    { key: "movil", label: m.phoneLabel, detail: m.extActive, icon: "phone-call" as const },
  ];

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-step]", scope);
    gsap.from(cards, {
      opacity: 0,
      y: 14,
      duration: 0.4,
      ease: "power2.out",
      immediateRender: true,
      stagger: 0.08,
      scrollTrigger: { trigger: scope, start: "top 82%", once: true },
    });
  });

  return (
    <section
      data-tone="light"
      className="overflow-hidden bg-paper py-section-sm"
    >
      <Container width="wide">
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Columna de texto */}
          <div className="min-w-0">
            <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
              {extension.eyebrow}
            </p>
            <h2 className="mt-6 text-display-2">{extension.title}</h2>
            <p className="mt-2 max-w-[24ch] text-display-3 text-navy text-balance">
              {extension.subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {extension.body.map((p) => (
                <p key={p} className="measure-body text-body-sm text-fg-muted">
                  {p}
                </p>
              ))}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {extension.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.75rem] text-navy"
                >
                  <Icon name="check" size={13} className="text-positive" />
                  {b}
                </li>
              ))}
            </ul>

            <p className="measure-body mt-6 text-small text-fg-muted">
              {extension.closing}
            </p>

            <div className="mt-7">
              <Button
                href={extension.cta.href}
                variant="navy"
                iconRight={<Icon name="arrow-right" size={17} />}
              >
                {extension.cta.label}
              </Button>
            </div>
          </div>

          {/* Columna visual: foto, secuencia y acciones */}
          <div ref={scope} className="flex min-w-0 flex-col gap-4">
            {/* El QR va compuesto por CSS sobre la foto, no generado dentro de
                ella. Es el patron Tier B del plan: la fotografia aporta el
                objeto fisico (el soporte de la mesilla) y el codigo se pone
                encima como vector. Un QR "dibujado" por un modelo de imagen
                sale como una mancha de ruido y delata el montaje al instante;
                ademas, asi el motivo se mantiene nitido en retina. */}
            <div className="d-crop-r relative">
              <SmartImage
                image="home-extension-qr-room"
                sizes={SIZES.heroSplit}
                decorative
                wrapperClassName="h-full"
              />

              <div className="absolute top-1/2 left-[8%] w-[26%] max-w-[9rem] -translate-y-1/2 rounded-lg bg-white p-2.5 shadow-md sm:left-[10%]">
                <QrMotif className="w-full" />
                <p className="mt-1.5 text-center font-mono text-[0.5rem] leading-tight tracking-[0.08em] text-ink uppercase">
                  {m.qrAction}
                </p>
              </div>
            </div>

            {/* Los tres pasos, en tira horizontal */}
            <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-3">
              {steps.map((s, i) => (
                <li
                  key={s.key}
                  data-step
                  className="flex min-w-0 items-center gap-3 bg-paper-warm p-4"
                >
                  <span
                    className="font-mono text-card-title text-cyan-ink-strong"
                    data-tabular
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-navy/[0.06] text-navy">
                    <Icon name={s.icon} size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-body-sm font-semibold">
                      {s.label}
                    </span>
                    <span className="block truncate font-mono text-[0.6875rem] text-fg-muted">
                      {s.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            {/* Lo que el huesped puede hacer desde su movil */}
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
              {m.actions.map((a) => (
                <li
                  key={a}
                  className="flex min-w-0 items-center gap-2.5 bg-paper p-4"
                >
                  <Icon
                    name="check-circle"
                    size={15}
                    className="shrink-0 text-positive"
                  />
                  <span className="text-body-sm">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
