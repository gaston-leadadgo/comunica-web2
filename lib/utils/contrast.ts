/**
 * Contraste WCAG 2.1 calculado, no estimado.
 *
 * Existe porque la paleta oficial de Comunica tiene una trampa: el cyan de marca
 * (#009FE3) sobre blanco da 2,97:1, asi que falla AA para texto normal (4,5:1) e
 * incluso para texto grande (3:1). El manual, en cambio, pone todos sus parrafos
 * secundarios en ese cyan sobre blanco. La ruta /ds usa estas funciones para
 * dejar el problema (y su solucion) a la vista en lugar de en un comentario.
 */

function channelToLinear(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

export type WcagLevel = "AAA" | "AA" | "AA-large" | "fail";

/**
 * `large` = >=24px normal o >=18,66px bold. Umbrales: 4,5 texto normal,
 * 3,0 texto grande, 7,0 para AAA normal.
 */
export function wcagLevel(ratio: number, large = false): WcagLevel {
  if (large) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3) return "AA-large";
    return "fail";
  }
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA-large";
  return "fail";
}

export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2).replace(".", ",")}:1`;
}
