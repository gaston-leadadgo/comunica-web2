"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Capa de movimiento.
 *
 * Reglas que vienen de la guia de motion y que aqui se respetan:
 * - Como maximo 1-2 secciones con `pin` en toda la pagina: pinar mas pelea con
 *   el scroll nativo y se nota sobre todo en movil. En esta home hay dos.
 * - `scrub` siempre entre 0,5 y 1,5, nunca `true` a secas en timelines largas,
 *   para que se sienta atado a la barra de scroll.
 * - `ScrollTrigger.refresh()` despues de que carguen fuentes e imagenes, o el
 *   pin calcula alturas equivocadas.
 * - Todo se scopea al contenedor de la seccion para no reescanear la pagina.
 * - Bajo `prefers-reduced-motion` no se registra ni un trigger: se deja el
 *   estado final y punto.
 *
 * Y la regla anti-CLS: los elementos se renderizan en su estado final en el
 * HTML. Se animan con `gsap.from()`, asi que si el JS tarda o falla, el
 * contenido ya esta visible y en su sitio.
 */

/**
 * Se llama una vez desde el layout: recalcula las posiciones de todos los
 * ScrollTrigger en varios momentos, no solo uno.
 *
 * Un solo `refresh()` en `fonts.ready` no basta: si el usuario recarga la
 * pagina estando ya a mitad de scroll (el navegador restaura la posicion de
 * scroll en un reload), cada seccion registra su trigger con `once:true` +
 * `immediateRender:true` -> el contenido se pinta oculto de inmediato, y solo
 * vuelve a mostrarse si un `refresh()` posterior detecta que ese punto de
 * scroll ya quedo atras. Si ese refresh llega antes de que las imagenes
 * terminen de decodificar o el layout asiente del todo, la posicion calculada
 * puede quedar mal y el trigger no se dispara nunca: la seccion se queda
 * invisible para siempre, sin ningun reintento.
 *
 * Por eso se dispara en tres momentos independientes en vez de uno: apenas
 * termina el primer pintado, cuando cargan las fuentes, y cuando la carga de
 * la pagina (`load`, incluidas imagenes) termina del todo. Si cualquiera de
 * los tres llega con el layout ya estable, corrige la seccion que se hubiera
 * quedado oculta.
 */
export function refreshOnFontsReady() {
  if (typeof document === "undefined") return;

  const refresh = () => ScrollTrigger.refresh();

  requestAnimationFrame(() => requestAnimationFrame(refresh));
  void document.fonts?.ready.then(refresh);

  if (document.readyState === "complete") {
    refresh();
  } else {
    window.addEventListener("load", refresh, { once: true });
  }
}

type MotionContext = {
  gsap: typeof gsap;
  scope: HTMLElement;
  reduced: boolean;
};

/**
 * Envoltorio de `useGSAP` que resuelve el scope y el estado de
 * `prefers-reduced-motion` en un solo sitio.
 */
export function useBrandMotion<T extends HTMLElement = HTMLDivElement>(
  fn: (ctx: MotionContext) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const scope = useRef<T | null>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      fn({ gsap, scope: el, reduced });
    },
    { scope, dependencies: deps },
  );

  return scope;
}

/**
 * El reveal por defecto de toda la web: entra una vez al cruzar el 82% del
 * viewport, sube 22px y sube de opacidad, con un `stagger` corto si son varios
 * elementos. Existe porque antes de esto la inmensa mayoria de las secciones no
 * tenian ni un `useBrandMotion`: de las ~30 de la web, solo 7 usaban movimiento.
 * Centralizar el patron aqui es lo que permite cubrir el resto sin repetir la
 * misma configuracion de ScrollTrigger veinte veces.
 *
 * `targets` puede ser un selector (se resuelve dentro de `scope`) o una lista de
 * elementos ya resuelta. Si no hay nada que animar, no registra ningun trigger.
 */
export function revealOnScroll(
  gsapInstance: typeof gsap,
  scope: HTMLElement,
  targets: string | Element[] | NodeListOf<Element>,
  opts: {
    y?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    start?: string;
    scale?: number;
  } = {},
) {
  const {
    y = 24,
    duration = 0.65,
    stagger = 0.09,
    delay = 0,
    ease = "power3.out",
    start = "top 82%",
    scale,
  } = opts;

  const els =
    typeof targets === "string"
      ? gsapInstance.utils.toArray<Element>(targets, scope)
      : targets instanceof NodeList
        ? Array.from(targets)
        : targets;

  if (!els.length) return;

  gsapInstance.from(els, {
    opacity: 0,
    y,
    ...(scale ? { scale } : {}),
    duration,
    stagger,
    delay,
    ease,
    // Explicito, no confiado al default: fuerza a que el estado "opacity:0"
    // se aplique de forma sincrona en cuanto se crea el tween, sin esperar a
    // que ScrollTrigger complete su primer ciclo de refresh. Sin esto, en
    // paginas con muchos triggers los ultimos en registrarse pueden quedar
    // renderizados en su estado final (opacity:1) desde el primer pintado,
    // sin ninguna transicion visible cuando el usuario llega a esa seccion.
    immediateRender: true,
    scrollTrigger: { trigger: scope, start, once: true },
  });
}

export { gsap, ScrollTrigger };
