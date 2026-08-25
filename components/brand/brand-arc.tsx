import { cn } from "@/lib/utils/cn";

import { GRADIENT_ID_ARC } from "./brand-defs";

/**
 * El arco de marca.
 *
 * Es el rasgo mas distintivo del manual: una curva fina en degradado cyan que
 * recorre el lateral de cada pagina de arriba abajo. No estaba en ninguno de los
 * wireframes, y recuperarlo es lo que hace que la web se reconozca como Comunica
 * y no como una plantilla.
 *
 * Aqui no es decoracion: marca la frontera entre el lado huesped (claro) y el
 * lado tecnico (oscuro) del "umbral", y en la variante `edge` hace de barra de
 * progreso de lectura.
 *
 * Tres usos, y solo tres:
 * - `edge`: recorre el borde del viewport de arriba abajo.
 * - `seam`: arco corto que cruza la frontera claro/oscuro entre dos secciones.
 * - `focus`: envuelve parcialmente un dato (una metrica, un mockup, un numero).
 *
 * Prohibido: arcos como patron repetido, arcos cerrados en circulo, arcos
 * rellenos, y mas de un arco animandose a la vez.
 */

type ArcPlacement = "edge" | "seam" | "focus";
type ArcTone = "gradient" | "cyan" | "navy" | "white";

type BrandArcProps = {
  placement?: ArcPlacement;
  /** Espejo horizontal: el arco pasa al lado izquierdo. */
  flip?: boolean;
  tone?: ArcTone;
  /** Grosor del trazo en px, constante a cualquier escala. */
  weight?: number;
  opacity?: number;
  className?: string;
  /**
   * Marca el trazo para que GSAP DrawSVG lo dibuje con el scroll. El estado
   * inicial se deja dibujado al 100%: si el JS tarda o falla, el arco se ve
   * completo en lugar de desaparecer.
   */
  draw?: boolean;
};

/**
 * Curvas calcadas de la proporcion del manual: un arco muy abierto, casi
 * vertical, que entra por arriba y sale por abajo con una sola inflexion.
 * `viewBox` de 100x1000 para que el trazo escale en alto sin deformarse.
 */
const ARC_PATHS: Record<ArcPlacement, { d: string; viewBox: string }> = {
  edge: {
    viewBox: "0 0 100 1000",
    d: "M 96 0 C 40 210 4 380 4 520 C 4 660 44 800 96 1000",
  },
  seam: {
    viewBox: "0 0 400 160",
    d: "M 0 152 C 96 24 304 24 400 152",
  },
  focus: {
    viewBox: "0 0 200 200",
    d: "M 8 168 C 8 60 92 8 192 32",
  },
};

const TONE_STROKE: Record<ArcTone, string> = {
  gradient: `url(#${GRADIENT_ID_ARC})`,
  cyan: "var(--color-cyan)",
  navy: "var(--color-navy)",
  white: "#fff",
};

export function BrandArc({
  placement = "edge",
  flip = false,
  tone = "gradient",
  weight = 2,
  opacity,
  className,
  draw = false,
}: BrandArcProps) {
  const arc = ARC_PATHS[placement];
  const resolvedOpacity = opacity ?? (tone === "white" ? 0.55 : 0.55);

  return (
    <svg
      viewBox={arc.viewBox}
      preserveAspectRatio={placement === "edge" ? "none" : "xMidYMid meet"}
      aria-hidden="true"
      focusable="false"
      className={cn(
        "pointer-events-none absolute",
        flip && "-scale-x-100",
        className,
      )}
      style={{ opacity: resolvedOpacity }}
      data-brand-arc={placement}
    >
      <path
        d={arc.d}
        fill="none"
        stroke={TONE_STROKE[tone]}
        strokeWidth={weight}
        strokeLinecap="round"
        // Mantiene el grosor real en px aunque el SVG se estire (edge usa
        // preserveAspectRatio="none", que de otro modo deformaria el trazo).
        vectorEffect="non-scaling-stroke"
        // pathLength normalizado: permite animar strokeDashoffset de 1 a 0 sin
        // conocer la longitud real del trazado.
        pathLength={1}
        data-draw={draw ? "true" : undefined}
      />
    </svg>
  );
}
