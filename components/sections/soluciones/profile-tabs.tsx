"use client";

import { useId, useRef, useState } from "react";

import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import type { ImageKey } from "@/content/images";
import { hotelProfiles } from "@/content/perfiles";
import { soluciones } from "@/content/soluciones";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";
import { cn } from "@/lib/utils/cn";

/**
 * Las cuatro fichas de perfil, en pestanas verticales.
 *
 * La home cuenta lo mismo con un acordeon horizontal de lamas. Aqui hace falta
 * otra cosa: la ficha completa lleva servicios incluidos, opcionales y cierre, y
 * eso no cabe en una lama. Una lista de pestanas en la columna izquierda deja el
 * panel entero para el contenido y ademas hace visible de un golpe que hay cuatro
 * caminos, que es el argumento de la pagina.
 *
 * Patron WAI-ARIA completo, implementado a mano porque el proyecto no lleva
 * Radix: `role="tablist"` vertical, `roving tabindex` (solo la pestana activa es
 * enfocable), flechas arriba/abajo con ciclo, Inicio y Fin. El prototipo usaba
 * `<button>` sueltos sin rol, sin `aria-selected` y sin teclado.
 *
 * La sustitucion del panel NO es un crossfade: el panel entrante se descubre con
 * `clip-path` vertical en 300 ms. Un crossfade entre dos bloques de texto deja
 * los dos legibles a la vez y se lee como un fallo de render.
 */

const PROFILE_IMAGE: Record<string, ImageKey> = {
  conectado: "home-profile-conectado-independiente",
  consolidado: "home-profile-consolidado-grupo",
  gestionado: "home-profile-gestionado-cadena",
  especializado: "home-profile-especializado-proyecto",
};

export function SolucionesProfileTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const labels = soluciones.profileLabels;

  const focusTab = (i: number) => {
    const next = (i + hotelProfiles.length) % hotelProfiles.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number | undefined> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: hotelProfiles.length - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    focusTab(next);
  };

  const profile = hotelProfiles[active];
  const isProject = profile.id === "especializado";

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power3.out",
      immediateRender: true,
      scrollTrigger: { trigger: scope, start: "top 82%", once: true },
    });
  });

  return (
    <section id="perfiles" data-tone="light" className="bg-paper-warm py-section">
      <Container width="wide">
        <div ref={scope} className="grid gap-x-14 gap-y-8 lg:grid-cols-[15rem_1fr] lg:items-start">
          {/* Lista de pestanas */}
          <div
            role="tablist"
            aria-label={labels.tablistLabel}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            // En movil es una rejilla 2x2, no una tira con scroll horizontal: con
            // scroll, dos de los cuatro perfiles quedan fuera de pantalla sin
            // ninguna senal de que existen, y el argumento de la pagina es
            // justamente que hay cuatro caminos. En escritorio pasa a columna.
            className="grid grid-cols-2 gap-2 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:grid-cols-1"
          >
            {hotelProfiles.map((p, i) => {
              const selected = i === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${p.id}`}
                  aria-selected={selected}
                  // Solo la pestana activa apunta a un panel: los inactivos no
                  // estan en el DOM, y un `aria-controls` que referencia un id
                  // inexistente es un atributo invalido.
                  aria-controls={selected ? `${baseId}-panel-${p.id}` : undefined}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative min-w-0 rounded-lg px-4 py-3.5 text-left transition-colors lg:px-5 lg:py-4",
                    selected
                      ? "bg-navy text-white"
                      : "bg-paper text-fg hover:bg-paper-warm-2",
                  )}
                >
                  <span className="block text-card-title">{p.name}</span>
                  <span
                    className={cn(
                      "mt-1 block font-mono text-[0.6875rem]",
                      selected ? "text-cyan" : "text-fg-muted",
                    )}
                    data-tabular
                  >
                    {p.size}
                  </span>
                  {selected ? (
                    <span
                      aria-hidden="true"
                      className="bg-brand-gradient absolute inset-x-5 bottom-1.5 h-[2px] rounded-full lg:inset-x-auto lg:inset-y-3 lg:left-0 lg:h-auto lg:w-[2px]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Panel activo */}
          <div
            role="tabpanel"
            id={`${baseId}-panel-${profile.id}`}
            aria-labelledby={`${baseId}-tab-${profile.id}`}
            tabIndex={0}
            // `key` fuerza el remontaje al cambiar de pestana, que es lo que
            // reinicia la animacion de descubierto sin gestionar estado extra.
            key={profile.id}
            className="animate-reveal-down min-w-0 rounded-xl bg-paper p-7 lg:p-12"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-display-2">{profile.name}</h2>
                <p className="mt-1 max-w-[28ch] text-display-3 text-cyan-strong">
                  {profile.headline}
                </p>
              </div>
              <span className="rounded-full border border-line px-4 py-2 font-mono text-[0.6875rem] tracking-[0.08em] text-navy uppercase">
                {profile.audience}
              </span>
            </div>

            <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="min-w-0">
                <div className="flex flex-col gap-4">
                  {profile.body.map((p, i) => (
                    <p
                      key={p}
                      className={cn(
                        "measure-body",
                        i === profile.body.length - 1
                          ? "text-display-3 text-navy"
                          : "text-body-sm text-fg-muted",
                      )}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <p className="mt-9 font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
                  {isProject ? labels.specific : labels.includes}
                </p>

                <ul className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
                  {profile.includes.map((item) => (
                    <li key={item.title} className="min-w-0 bg-paper-warm p-5">
                      <p className="flex items-start gap-2.5 text-card-title">
                        <Icon
                          name="check"
                          size={15}
                          className="mt-0.5 shrink-0 text-positive"
                        />
                        {item.title}
                      </p>
                      {item.detail ? (
                        <p className="mt-2 pl-[1.55rem] text-small text-fg-muted">
                          {item.detail}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>

                {profile.optional ? (
                  <div className="rounded-shield mt-6 border border-line bg-paper-warm-2 p-5">
                    <p className="font-mono text-eyebrow tracking-[0.2em] text-navy uppercase">
                      {labels.optional}
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {profile.optional.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2.5 text-body-sm text-fg-muted"
                        >
                          <Icon
                            name="sparkles"
                            size={14}
                            className="mt-1 shrink-0 text-cyan-ink"
                          />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="min-w-0">
                <SmartImage
                  image={PROFILE_IMAGE[profile.id]}
                  sizes={SIZES.grid2}
                  decorative
                  wrapperClassName="rounded-shield"
                />

                <p className="mt-7 border-l-2 border-cyan pl-5 text-body-sm font-semibold text-navy">
                  {profile.closing}
                </p>

                <div className="mt-7">
                  <Button
                    href={profile.cta.href}
                    variant="navy"
                    iconRight={<Icon name="arrow-right" size={17} />}
                    className="w-full sm:w-auto"
                  >
                    {profile.cta.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
