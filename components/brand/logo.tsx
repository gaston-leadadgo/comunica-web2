import { cn } from "@/lib/utils/cn";

import { GRADIENT_ID_LOCKUP, GRADIENT_ID_SYMBOL } from "./brand-defs";
import {
  LOCKUP_VIEWBOX,
  SYMBOL_PATH,
  SYMBOL_PATH_IN_LOCKUP,
  SYMBOL_VIEWBOX,
  WORD_PATH,
} from "./logo-paths";

/**
 * Variantes segun el manual (pag. 2):
 * - `principal`: wordmark en Process Black + simbolo en degradado 100 grados.
 *   "Utilizada en todos los soportes de comunicacion".
 * - `negativo`: wordmark en blanco + simbolo en degradado. Para fondos oscuros.
 * - `mono`: todo en un solo color, heredado de `currentColor`. Para fondo cyan
 *   corporativo o fotografia, "cuando se prescinda de degradados".
 */
export type LogoVariant = "principal" | "negativo" | "mono";

type LogoProps = {
  variant?: LogoVariant;
  /** Alto en px. El ancho se deriva de la proporcion real del lockup (4,379:1). */
  height?: number;
  className?: string;
  /** `true` cuando el logo va dentro de un enlace o titulo que ya lo nombra. */
  decorative?: boolean;
};

export function Logo({
  variant = "principal",
  height = 28,
  className,
  decorative = false,
}: LogoProps) {
  const mono = variant === "mono";

  const wordFill = mono
    ? "currentColor"
    : variant === "negativo"
      ? "#fff"
      : "var(--color-ink)";

  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      height={height}
      className={cn("block w-auto", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Comunica"}
      focusable="false"
    >
      <path fill={wordFill} fillRule="evenodd" d={WORD_PATH} />
      <path
        fill={mono ? "currentColor" : `url(#${GRADIENT_ID_LOCKUP})`}
        fillRule="evenodd"
        d={SYMBOL_PATH_IN_LOCKUP}
      />
    </svg>
  );
}

type SymbolProps = {
  /** `false` para heredar `currentColor` en lugar del degradado de marca. */
  gradient?: boolean;
  size?: number;
  className?: string;
  decorative?: boolean;
};

/**
 * El simbolo suelto: puerta, escudo y burbuja de dialogo a la vez. Se usa como
 * favicon, marca de agua, vineta de lista y ancla de animaciones.
 */
export function BrandSymbol({
  gradient = true,
  size = 32,
  className,
  decorative = true,
}: SymbolProps) {
  return (
    <svg
      viewBox={SYMBOL_VIEWBOX}
      height={size}
      className={cn("block w-auto", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Comunica"}
      focusable="false"
    >
      <path
        fill={gradient ? `url(#${GRADIENT_ID_SYMBOL})` : "currentColor"}
        fillRule="evenodd"
        d={SYMBOL_PATH}
      />
    </svg>
  );
}
