"use client";

import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { Icon } from "@/components/ui/icon";
import { capabilities } from "@/content/perfiles";
import { nosotros } from "@/content/nosotros";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Tres bloques de argumento en una sola seccion: el equipo, la innovacion y la
 * anticipacion.
 *
 * Van juntos porque los tres son la misma idea vista desde angulos distintos y,
 * separados en tres secciones con su propio aire, la pagina se hacia
 * interminable. Aqui comparten superficie y se separan con hairlines, que es
 * suficiente jerarquia.
 *
 * En "Un equipo. Muchas capacidades" las siete piezas aparecen como fichas mono:
 * el copy dice "hay empresas excelentes en conectividad, otras en WiFi...", asi
 * que verlas todas juntas ES el argumento. Se reutiliza `capabilities`, no se
 * escribe una segunda lista.
 *
 * Movimiento: los tres bloques se separan con hairline y cada uno dispara su
 * propio reveal al entrar, no uno solo al principio de la seccion — es una
 * seccion larga, y un unico trigger arriba dejaria los dos bloques de abajo sin
 * animar (ya habrian "cruzado" el umbral antes de que el usuario los vea).
 */
export function NosotrosTeamAndVision() {
  const { team, innovation, ahead } = nosotros;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    const blocks = gsap.utils.toArray<HTMLElement>("[data-block]", scope);
    blocks.forEach((block) => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", block);
      if (!targets.length) return;
      gsap.from(targets, {
        opacity: 0,
        y: 22,
        duration: 0.55,
        ease: "power3.out",
        immediateRender: true,
        stagger: 0.08,
        scrollTrigger: { trigger: block, start: "top 82%", once: true },
      });
    });
  });

  return (
    <section data-tone="light" className="bg-paper-warm-2 py-section">
      <Container>
      <div ref={scope}>
        {/* Un equipo. Muchas capacidades */}
        <div data-block>
        <div data-reveal className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <h2 className="max-w-[18ch] text-display-2 text-balance">{team.title}</h2>
          <div className="flex min-w-0 flex-col gap-4">
            {team.body.map((p, i) => (
              <p
                key={p}
                className={
                  i === team.body.length - 1
                    ? "measure-body text-display-3 text-navy"
                    : "measure-body text-body text-fg-muted"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Las siete piezas, juntas: eso es el argumento */}
        <ul data-reveal className="mt-10 flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-[0.75rem] text-navy"
            >
              <Icon name={c.icon} size={14} className="text-cyan-ink" />
              {c.title}
            </li>
          ))}
        </ul>

        {/* Los dos casos */}
        <div data-reveal className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2">
          {team.cases.map((c) => (
            <div key={c.label} className="min-w-0 bg-paper p-7">
              <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
                {c.label}
              </p>
              <p className="mt-4 text-display-3 text-navy">{c.text}</p>
            </div>
          ))}
        </div>
        </div>

        {/* Innovacion.
            ---------------------------------------------------------------
            El primer parrafo pasa a la columna IZQUIERDA, bajo el titulo. Antes
            los dos parrafos y el enfasis se apilaban a la derecha y la columna
            del titulo quedaba medio vacia: el bloque se leia como una sola
            columna larga con un titulo colgando al lado. Repartido, cada
            columna sostiene su propio peso y el enfasis cierra la derecha. */}
        <div data-block className="mt-16 border-t border-line pt-16">
          <div data-reveal className="grid gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-start">
            <div className="min-w-0">
              <h2 className="max-w-[20ch] text-display-2 text-balance">
                {innovation.title}
              </h2>
              <p className="measure-body mt-7 text-body-sm text-fg-muted">
                {innovation.body[0]}
              </p>
            </div>

            <div className="min-w-0">
              <p className="measure-body text-body-sm text-fg-muted">
                {innovation.body[1]}
              </p>
              <p className="mt-7 border-l-2 border-cyan pl-5 text-display-3 text-navy">
                {innovation.closing}
              </p>
            </div>
          </div>
        </div>

        {/* Anticipacion.
            ---------------------------------------------------------------
            Es el ultimo bloque de la pagina y era el mas vacio: titulo y dos
            parrafos en una rejilla de dos columnas, con media seccion en
            blanco. Se le da una tercera columna con imagen —el espacio ya
            estaba reservado, solo faltaba llenarlo— y la frase de cierre pasa a
            destacada, que es lo que el copy pide: "Porque ser un buen partner
            tecnologico..." es la conclusion del argumento, no un parrafo mas. */}
        <div data-block className="mt-16 border-t border-line pt-16">
          <div data-reveal className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="min-w-0">
              {/* Sin `text-balance`: el equilibrado repartiria las dos lineas
                  por ancho y volveria a romper la antitesis que el corte
                  explicito acaba de fijar. */}
              <h2 className="text-display-2">
                <span className="block">{ahead.titleLine1}</span>
                <span className="block">{ahead.titleLine2}</span>
              </h2>

              <div className="mt-7 flex flex-col gap-5">
                {ahead.body.map((p, i) =>
                  i === ahead.body.length - 1 ? (
                    <p
                      key={p}
                      className="measure-body border-l-2 border-cyan pl-5 text-display-3 text-navy"
                    >
                      <HotelText>{p}</HotelText>
                    </p>
                  ) : (
                    <p key={p} className="measure-body text-body-sm text-fg-muted">
                      <HotelText>{p}</HotelText>
                    </p>
                  ),
                )}
              </div>
            </div>

            <div className="min-w-0">
              <SmartImage
                image="nosotros-vision-reforma"
                sizes={SIZES.heroSplit}
                decorative
                wrapperClassName="d-crop-r"
              />
            </div>
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}
