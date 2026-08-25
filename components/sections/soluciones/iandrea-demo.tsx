"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { soluciones } from "@/content/soluciones";
import { gsap, useBrandMotion } from "@/lib/gsap/use-brand-motion";
import { cn } from "@/lib/utils/cn";

/**
 * Simulador interactivo de iAndrea.
 *
 * La idea y el guion vienen de la version de Marcos
 * (`comunica-version-marcos/src/components/AndreaVoiceDemo.tsx`). Lo que cambia
 * aqui, y por que:
 *
 * - Sistema de diseno propio: tokens de marca en lugar de `brand-cyan`/
 *   `brand-dark` sueltos, `Icon` del registro tipado en vez de importar
 *   `lucide-react` directamente, y el navy del manual como superficie.
 * - Copy y establecimientos en `content/soluciones.ts`, no incrustados en el
 *   componente. El original llevaba el guion entero dentro del JSX, incluidas
 *   marcas de terceros sin autorizacion (ver la nota en el content).
 * - Accesibilidad, que en el original no existia: el hilo es una `role="log"`
 *   con `aria-live="polite"`, asi que un lector de pantalla anuncia cada turno
 *   nuevo; los selectores de escenario son `role="tablist"` con flechas; y el
 *   estado de la llamada se anuncia por texto, no solo por el color de un punto.
 * - El indicador de "pensando" respeta `prefers-reduced-motion`: sin
 *   animaciones, los puntos se sustituyen por texto.
 *
 * El temporizador se guarda en un ref y se limpia al desmontar y al cambiar de
 * escenario. Sin eso, cambiar de pestana con una respuesta en vuelo inyecta el
 * turno del escenario anterior en el hilo del nuevo.
 */

type Turn = { speaker: "andrea" | "user"; text: string; id: number };

const THINKING_MS = 1400;

export function SolucionesIandreaDemo() {
  const { demo } = soluciones;
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [thinking, setThinking] = useState(false);
  const [started, setStarted] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const turnCounter = useRef(0);

  const scenario = demo.scenarios[scenarioIndex];

  const nextId = () => {
    turnCounter.current += 1;
    return turnCounter.current;
  };

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // Al montar y al cambiar de escenario: hilo limpio con solo el saludo.
  // `scenario.greeting` en las dependencias y no `scenarioIndex`: es el valor
  // que de verdad se usa dentro, y asi el linter de hooks no pide silenciarlo.
  useEffect(() => {
    clearTimer();
    turnCounter.current = 0;
    setTurns([{ speaker: "andrea", text: scenario.greeting, id: nextId() }]);
    setThinking(false);
    setStarted(false);
    setAsked([]);
  }, [scenario.greeting]);

  useEffect(() => clearTimer, []);

  // El hilo tiene alto fijo y scroll propio: al llegar un turno nuevo hay que
  // bajarlo, o la respuesta aparece fuera de vista y parece que no ha pasado
  // nada. `scrollTop` directo y no `scrollIntoView`, que ademas desplazaria la
  // pagina entera.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, thinking]);

  const ask = (optionIndex: number) => {
    if (thinking) return;
    const option = scenario.options[optionIndex];

    setStarted(true);
    setAsked((prev) => (prev.includes(optionIndex) ? prev : [...prev, optionIndex]));
    setTurns((prev) => [
      ...prev,
      { speaker: "user", text: option.question, id: nextId() },
    ]);
    setThinking(true);

    clearTimer();
    timer.current = setTimeout(() => {
      setTurns((prev) => [
        ...prev,
        { speaker: "andrea", text: option.answer, id: nextId() },
      ]);
      setThinking(false);
      timer.current = null;
    }, THINKING_MS);
  };

  const reset = () => {
    clearTimer();
    turnCounter.current = 0;
    setTurns([{ speaker: "andrea", text: scenario.greeting, id: nextId() }]);
    setThinking(false);
    setStarted(false);
    setAsked([]);
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number | undefined> = {
      ArrowRight: scenarioIndex + 1,
      ArrowDown: scenarioIndex + 1,
      ArrowLeft: scenarioIndex - 1,
      ArrowUp: scenarioIndex - 1,
      Home: 0,
      End: demo.scenarios.length - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setScenarioIndex((next + demo.scenarios.length) % demo.scenarios.length);
  };

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    gsap.from(gsap.utils.toArray("[data-reveal]", scope), {
      opacity: 0,
      y: 22,
      duration: 0.6,
      ease: "power3.out",
      immediateRender: true,
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 80%", once: true },
    });
  });

  const status = thinking
    ? demo.statusThinking
    : started
      ? demo.statusLive
      : demo.statusIdle;

  return (
    <section
      id="iandrea-demo"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-navy-deep py-section text-fg-inverse"
    >
      <div aria-hidden="true" className="bg-radial-wash absolute inset-0 -z-10 opacity-70" />

      <Container width="wide">
        <div ref={scope}>
          <div data-reveal className="max-w-[46rem]">
            <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
              {demo.eyebrow}
            </p>
            <h2 className="mt-6 text-display-2 text-white">{demo.title}</h2>
            <p className="measure-lead mt-5 text-lead text-fg-inverse-muted">
              {demo.lead}
            </p>
          </div>

          <div
            data-reveal
            className="mt-12 overflow-hidden rounded-xl border border-white/12 bg-navy"
          >
            {/* Barra superior: identidad + escenarios */}
            <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-cyan/50 bg-cyan/12 text-cyan">
                  <Icon name="sparkles" size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-card-title text-white">
                    iAndrea
                  </span>
                  <span className="block font-mono text-[0.6875rem] text-fg-inverse-muted">
                    {scenario.subtitle}
                  </span>
                </span>
              </div>

              <div
                role="tablist"
                aria-label={demo.scenarioLabel}
                onKeyDown={onTabKey}
                className="flex gap-1 rounded-lg border border-white/12 bg-navy-deep p-1"
              >
                {demo.scenarios.map((s, i) => {
                  const selected = i === scenarioIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setScenarioIndex(i)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-body-sm font-semibold transition-colors",
                        selected
                          ? "bg-cyan text-ink"
                          : "text-fg-inverse-muted hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <Icon name={s.icon} size={15} />
                      <span className="whitespace-nowrap">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              {/* Columna de control */}
              <div className="min-w-0 border-b border-white/10 p-6 lg:border-r lg:border-b-0 lg:p-8">
                <p className="measure-body text-body-sm text-fg-inverse-muted">
                  {scenario.description}
                </p>

                <p className="mt-8 font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
                  {demo.optionsLabel}
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {scenario.options.map((o, i) => (
                    <li key={o.label}>
                      <button
                        type="button"
                        onClick={() => ask(i)}
                        disabled={thinking}
                        className={cn(
                          "group flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-body-sm transition-colors",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          asked.includes(i)
                            ? "border-white/10 bg-transparent text-fg-inverse-muted"
                            : "border-white/15 bg-white/[0.05] text-white hover:border-cyan hover:bg-cyan/10",
                        )}
                      >
                        <span className="min-w-0">{o.label}</span>
                        <Icon
                          name="message-square"
                          size={15}
                          className="shrink-0 text-cyan"
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 inline-flex items-center gap-2 rounded-full text-small text-fg-inverse-muted transition-colors hover:text-white"
                >
                  <Icon name="refresh-cw" size={13} />
                  {demo.resetLabel}
                </button>
              </div>

              {/* Columna de conversacion */}
              <div className="flex min-w-0 flex-col p-6 lg:p-8">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-2.5 shrink-0 rounded-full",
                      thinking
                        ? "animate-blip bg-cyan"
                        : started
                          ? "bg-positive-soft"
                          : "bg-white/30",
                    )}
                  />
                  {/* El estado va tambien como texto, no solo como color: es la
                      unica forma de que se entienda sin ver el punto. */}
                  <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-fg-inverse-muted uppercase">
                    {status}
                  </span>
                </div>

                <div
                  ref={threadRef}
                  role="log"
                  aria-live="polite"
                  aria-label={demo.title}
                  className="mt-5 flex max-h-[19rem] min-h-[15rem] flex-col gap-3 overflow-y-auto pr-1"
                >
                  {turns.map((t) => {
                    const isAndrea = t.speaker === "andrea";
                    return (
                      <div
                        key={t.id}
                        className={cn(
                          "flex max-w-[88%] items-start gap-2.5",
                          isAndrea ? "mr-auto" : "ml-auto flex-row-reverse",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-full",
                            isAndrea
                              ? "bg-cyan/15 text-cyan"
                              : "bg-white/10 text-fg-inverse-muted",
                          )}
                        >
                          <Icon name={isAndrea ? "sparkles" : "user"} size={13} />
                        </span>
                        <p
                          className={cn(
                            "rounded-lg p-3.5 text-body-sm",
                            isAndrea
                              ? "rounded-tl-none border border-white/10 bg-white/[0.06] text-white"
                              : "rounded-tr-none bg-cyan text-ink",
                          )}
                        >
                          {/* Prefijo solo para lectores de pantalla: sin el, el
                              hilo se anuncia como un monologo sin turnos. */}
                          <span className="sr-only">
                            {isAndrea ? "iAndrea: " : "Tú: "}
                          </span>
                          {t.text}
                        </p>
                      </div>
                    );
                  })}

                  {thinking ? <ThinkingBubble /> : null}
                </div>

                <p className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 font-mono text-[0.6875rem] leading-relaxed text-fg-inverse-muted">
                  <Icon name="info" size={13} className="mt-px shrink-0 text-cyan" />
                  {demo.disclaimer}
                </p>
              </div>
            </div>
          </div>

          <p
            data-reveal
            className="mt-6 flex items-center gap-2 text-body-sm text-fg-inverse-muted"
          >
            <Icon name="zap" size={15} className="shrink-0 text-cyan" />
            {demo.footerNote}
          </p>
        </div>
      </Container>
    </section>
  );
}

/**
 * Los tres puntos de "escribiendo".
 *
 * Bajo `prefers-reduced-motion` los puntos quietos no comunican nada, asi que en
 * ese caso se cae a texto. La animacion se monta con GSAP y no con clases de
 * Tailwind porque el retardo por punto es lo que da la sensacion de secuencia, y
 * `animation-delay` en tres clases distintas es mas ruido que un timeline.
 */
function ThinkingBubble() {
  const dots = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dots.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-dot]", {
        y: -4,
        duration: 0.4,
        ease: "power1.inOut",
        stagger: { each: 0.14, repeat: -1, yoyo: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mr-auto flex max-w-[88%] items-start gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan"
      >
        <Icon name="sparkles" size={13} />
      </span>
      <span
        ref={dots}
        aria-hidden="true"
        className="flex items-center gap-1.5 rounded-lg rounded-tl-none border border-white/10 bg-white/[0.06] px-4 py-4"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            data-dot
            className="block size-1.5 rounded-full bg-cyan"
          />
        ))}
      </span>
    </div>
  );
}
