"use client";

import { useState } from "react";

import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { Icon } from "@/components/ui/icon";
import type { ImageKey } from "@/content/images";
import { home } from "@/content/home";
import { hotelProfiles } from "@/content/perfiles";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";
import { cn } from "@/lib/utils/cn";

/**
 * Acordeon horizontal de los cuatro perfiles de hotel.
 *
 * Uno de los tres componentes de la randomizacion, y encaja con el copy: la
 * seccion se llama "No todos los hoteles necesitan lo mismo", asi que en lugar de
 * cuatro tarjetas identicas en fila, las lamas verticales obligan a elegir. La
 * que se abre ocupa el espacio de las otras tres.
 *
 * Se abre por CLIC, no por hover: el hover como unico mecanismo excluye a
 * teclado y a tactil. En movil degrada a acordeon vertical clasico.
 *
 * Semantica: los encabezados son botones con `aria-expanded` y `aria-controls`,
 * y cada panel es una region etiquetada por su boton.
 */

const PROFILE_IMAGE: Record<string, ImageKey> = {
  conectado: "home-profile-conectado-independiente",
  consolidado: "home-profile-consolidado-grupo",
  gestionado: "home-profile-gestionado-cadena",
  especializado: "home-profile-especializado-proyecto",
};

export function ProfileAccordion() {
  const [openId, setOpenId] = useState<string>(hotelProfiles[0].id);

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-head]", { start: "top 85%" });
    revealOnScroll(gsap, scope, "[data-lama]", {
      stagger: 0.08,
      start: "top 80%",
      delay: 0.1,
    });
  });

  return (
    <section
      id="perfiles"
      data-tone="light"
      className="bg-paper-warm-2 py-section"
    >
      <Container width="wide">
        <div ref={scope}>
          <div data-head className="mx-auto max-w-[46rem] text-center">
            <h2 className="text-display-2 text-balance">{home.profiles.title}</h2>
            <p className="measure-lead mx-auto mt-7 text-lead text-fg-muted">
              <HotelText>{home.profiles.lead}</HotelText>
            </p>
          </div>

          {/* Lamas: en desktop la abierta crece a 2,4fr y las demas se comprimen */}
          <div className="mt-16 flex flex-col gap-px overflow-hidden rounded-xl bg-line lg:h-[34rem] lg:flex-row">
            {hotelProfiles.map((p) => {
              const isOpen = openId === p.id;
              const panelId = `perfil-panel-${p.id}`;
              const btnId = `perfil-btn-${p.id}`;

              return (
                <div
                  key={p.id}
                  data-lama
                  className="relative flex min-w-0 flex-col bg-paper transition-[flex-grow] duration-500 ease-out-expo lg:flex-row"
                // El reparto de ancho va en linea, no con `grow-[2.6]`: es un
                // valor numerico que depende del estado y Tailwind no genero esa
                // utilidad arbitraria, asi que la lama abierta quedaba a 0px.
                style={{ flexGrow: isOpen ? 2.6 : 0.55, flexBasis: 0 }}
              >
                {/* Cabecera / lama */}
                <button
                  type="button"
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(p.id)}
                  className={cn(
                    "group/lama flex shrink-0 cursor-pointer items-center gap-4 p-6 text-left transition-colors lg:h-full lg:w-[5.5rem] lg:flex-col lg:items-start lg:justify-between lg:p-7",
                    isOpen ? "bg-navy text-white" : "hover:bg-paper-warm",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-data",
                      isOpen ? "text-cyan" : "text-cyan-ink-strong",
                    )}
                    data-tabular
                  >
                    {p.size.match(/\d+[-–]\d+|\d+\+?/)?.[0] ?? "A medida"}
                  </span>

                  {/* Titulo en vertical solo en desktop */}
                  <span
                    className={cn(
                      "text-card-title lg:[writing-mode:vertical-rl]",
                      isOpen && "lg:text-white",
                    )}
                  >
                    {p.name}
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "ml-auto lg:ml-0",
                      isOpen ? "text-cyan" : "text-fg-muted",
                    )}
                  >
                    <Icon
                      name={isOpen ? "check" : "arrow-right"}
                      size={17}
                      className="lg:rotate-90"
                    />
                  </span>
                </button>

                {/* Panel */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="min-w-0 grow overflow-y-auto p-6 lg:p-10"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="min-w-0">
                      <p className="font-mono text-eyebrow tracking-[0.18em] text-cyan-ink-strong uppercase">
                        {p.audience}
                      </p>
                      <h3 className="mt-4 max-w-[22ch] text-display-3 text-balance">
                        {p.headline}
                      </h3>
                      <p className="measure-body mt-5 text-body-sm text-fg-muted">
                        {p.pain}
                      </p>

                      <p className="mt-6 border-l-2 border-cyan pl-4 text-body-sm font-semibold text-navy">
                        {p.answer}
                      </p>

                      <div className="mt-8">
                        <Button
                          href={p.cta.href}
                          variant="navy"
                          size="sm"
                          iconRight={<Icon name="arrow-right" size={15} />}
                        >
                          {p.cta.label}
                        </Button>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <SmartImage
                        image={PROFILE_IMAGE[p.id]}
                        sizes={SIZES.grid3}
                        decorative
                        wrapperClassName="rounded-shield"
                      />
                      <p className="mt-4 font-mono text-data text-fg-muted">
                        {p.size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </Container>
    </section>
  );
}
