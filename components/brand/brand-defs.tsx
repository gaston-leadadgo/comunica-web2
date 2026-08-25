import {
  BRAND_CYAN,
  BRAND_NAVY,
  brandGradientLine,
} from "./brand-gradient";
import { SYMBOL_OFFSET } from "./logo-paths";

export const GRADIENT_ID_SYMBOL = "comunica-grad-symbol";
export const GRADIENT_ID_LOCKUP = "comunica-grad-lockup";
export const GRADIENT_ID_ARC = "comunica-grad-arc";

const SYMBOL_W = 32.7;
const SYMBOL_H = 34.568;

/**
 * Se monta una unica vez en el layout raiz. Centralizar los degradados aqui
 * evita dos problemas: IDs duplicados en el DOM (que rompen la validacion y
 * hacen que un `url(#id)` resuelva al primero que encuentre) y la necesidad de
 * `useId`, que es un hook y no puede usarse en Server Components.
 *
 * Los degradados son `userSpaceOnUse`, asi que sus coordenadas se interpretan
 * en el espacio de usuario del elemento que los referencia. Por eso hay uno por
 * cada sistema de coordenadas distinto en el que se pinta el simbolo.
 */
export function BrandDefs() {
  const symbolLine = brandGradientLine(SYMBOL_W, SYMBOL_H);
  const lockupLine = brandGradientLine(
    SYMBOL_W,
    SYMBOL_H,
    SYMBOL_OFFSET.x,
    SYMBOL_OFFSET.y,
  );

  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute" }}
    >
      <defs>
        <linearGradient
          id={GRADIENT_ID_SYMBOL}
          gradientUnits="userSpaceOnUse"
          x1={symbolLine.x1}
          y1={symbolLine.y1}
          x2={symbolLine.x2}
          y2={symbolLine.y2}
        >
          <stop offset="0" stopColor={BRAND_NAVY} />
          <stop offset="1" stopColor={BRAND_CYAN} />
        </linearGradient>

        <linearGradient
          id={GRADIENT_ID_LOCKUP}
          gradientUnits="userSpaceOnUse"
          x1={lockupLine.x1}
          y1={lockupLine.y1}
          x2={lockupLine.x2}
          y2={lockupLine.y2}
        >
          <stop offset="0" stopColor={BRAND_NAVY} />
          <stop offset="1" stopColor={BRAND_CYAN} />
        </linearGradient>

        {/* El arco usa objectBoundingBox porque su caja cambia en cada uso y su
            trazado es casi vertical: aqui el angulo exacto importa menos que
            que el barrido recorra el trazo de arriba abajo. */}
        <linearGradient
          id={GRADIENT_ID_ARC}
          x1="0"
          y1="0"
          x2="0.18"
          y2="1"
        >
          <stop offset="0" stopColor={BRAND_NAVY} />
          <stop offset="1" stopColor={BRAND_CYAN} />
        </linearGradient>
      </defs>
    </svg>
  );
}
