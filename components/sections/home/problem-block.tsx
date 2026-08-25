"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * "Tu huesped no distingue entre tecnologia y servicio", en widgets.
 *
 * Rediseñada por peticion de cliente: antes eran dos columnas de texto corrido
 * con un revelado por scrub, y se leia como un articulo. Ahora el copy —que es
 * exactamente el mismo, literal de la demo— se reparte en tres bloques con
 * funciones distintas:
 *
 *   1. Bento de sintomas. Los tres sintomas son tarjetas-señal del lado huesped,
 *      con su icono y un punto de estado en rojo. Debajo, la consecuencia
 *      operativa ("Y mientras tanto...") cierra la escena.
 *   2. Isla navy con la cita y el giro del discurso.
 *   3. Las cuatro preguntas, ya en modo Comunica, con su indice en mono.
 *
 * El widget "¿Quien lo resuelve?" (las cuatro categorias marcadas "sin asignar")
 * se retira por peticion de cliente: duplicaba en forma de interfaz lo que el
 * parrafo de al lado ya decia con palabras, y alargaba la seccion sin anadir
 * argumento.
 *
 * Movimiento: stagger de rejilla (`grid: "auto"`, `from: "center"`) segun el
 * preset Standard de la guia de motion, pero con `power2.out` en lugar del
 * `back.out` del preset: el rebote se lee como juguete en una web B2B de
 * confianza. Entra una sola vez, sin scrub, porque estas tarjetas se leen de un
 * vistazo y un scrub las tendria a medio opacar durante media pantalla.
 */
export function ProblemBlock() {
  const { problem } = home;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", scope);
    gsap.from(cells, {
      opacity: 0,
      y: 18,
      scale: 0.97,
      duration: 0.45,
      ease: "power2.out",
      immediateRender: true,
      stagger: { each: 0.06, from: "center", grid: "auto" },
      scrollTrigger: { trigger: scope, start: "top 78%", once: true },
    });
  });

  return (
    <section data-tone="light" className="relative isolate bg-paper py-section">
      <Container width="wide">
        <h2 className="max-w-[24ch] text-display-2 text-balance">
          {problem.title}
        </h2>

        <div ref={scope}>
          <p className="mt-12 font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
            {problem.introLabel}
          </p>

          {/* Bento denso: 3 sintomas (2+2+2) = una fila exacta de 6. */}
          <div className="mt-5 grid grid-flow-dense grid-cols-1 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-6">
            {problem.symptoms.map((s) => (
              <article
                key={s.text}
                data-cell
                className="group/cell relative flex min-w-0 flex-col justify-between gap-8 bg-paper p-7 transition-colors hover:bg-paper-warm lg:col-span-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-md bg-critical/[0.07] text-critical">
                    <Icon name={s.icon} size={20} />
                  </span>
                  {/* Punto de estado: parpadea una vez cada 4 s, no en bucle
                      continuo. Un `ping` permanente se lee como alarma. */}
                  <span
                    aria-hidden="true"
                    className="animate-blip size-2 rounded-full bg-critical"
                  />
                </div>
                <p className="measure-card text-display-3 text-fg">{s.text}</p>
              </article>
            ))}
          </div>

          {/* "Y mientras tanto...": la consecuencia operativa va DEBAJO de los
              sintomas, no enfrentada al titular.
              ---------------------------------------------------------------
              Antes ocupaba la columna derecha del encabezado, donde se leia
              antes que los tres sintomas a los que se refiere — el "mientras
              tanto" no tenia todavia un "mientras" al que remitir. Aqui cierra
              la escena en el orden en que ocurre. */}
          <div className="mt-6 flex items-start gap-4 border-l-2 border-cyan pl-5">
            {problem.body.map((p) => (
              <p key={p} className="measure-body text-body text-fg-muted">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Isla navy: la cita y el giro. Bloque oscuro dentro de una seccion
            clara, asi que no cuenta como seccion oscura en el ritmo de la
            pagina. */}
        <div className="rounded-shield relative mt-4 overflow-hidden bg-navy p-8 text-fg-inverse lg:p-14">
          <BrandArc
            placement="edge"
            tone="white"
            opacity={0.35}
            className="inset-y-0 right-0 h-full w-[clamp(60px,10vw,140px)]"
          />
          <div className="relative grid gap-x-16 gap-y-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <blockquote className="relative pl-6">
              <span
                aria-hidden="true"
                className="bg-brand-gradient absolute top-0 left-0 h-full w-[3px] rounded-full"
              />
              <p className="max-w-[36ch] text-display-3 text-white text-balance">
                {problem.pullQuote}
              </p>
            </blockquote>
            <p className="measure-body text-body-sm text-fg-inverse-muted">
              {problem.afterQuote}
            </p>
          </div>
        </div>

        {/* Las cuatro preguntas */}
        <div className="mt-14">
          <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
            {problem.questionsLabel}
          </p>

          <ul className="mt-5 grid grid-flow-dense grid-cols-1 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {problem.questions.map((q, i) => (
              <li
                key={q}
                className="flex min-w-0 flex-col gap-5 bg-paper-warm p-6 transition-colors hover:bg-paper"
              >
                <span
                  className="font-mono text-data text-cyan-ink-strong"
                  data-tabular
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-card-title">{q}</span>
              </li>
            ))}
          </ul>

          <p className="mt-9 text-display-3 text-cyan-strong">
            {problem.closing}
          </p>
        </div>
      </Container>

      <BrandArc
        placement="seam"
        tone="gradient"
        opacity={0.3}
        className="-bottom-px left-1/2 w-[min(820px,88vw)] -translate-x-1/2 rotate-180"
      />
    </section>
  );
}
