/**
 * El manual fija el degradado de marca como "DEGRADADO LINEAL 100 grados,
 * PANTONE 540 C + PROCESS CYAN C". En CSS eso es
 * `linear-gradient(100deg, #003057, #009FE3)`.
 *
 * SVG no acepta angulos: hay que dar dos puntos. Estas funciones traducen el
 * angulo CSS a coordenadas `userSpaceOnUse` exactas para un rectangulo dado,
 * de modo que el arco de marca, el simbolo del logo y cualquier fondo
 * `bg-brand-gradient` compartan el mismisimo angulo.
 *
 * Por que no `objectBoundingBox` con `gradientTransform="rotate(10)"`: en esas
 * unidades la rotacion se deforma con la relacion de aspecto del elemento, asi
 * que el angulo real solo coincide en cajas cuadradas.
 */

export const BRAND_NAVY = "#003057";
export const BRAND_CYAN = "#009FE3";
export const BRAND_ANGLE_DEG = 100;

export type GradientLine = { x1: number; y1: number; x2: number; y2: number };

/**
 * Extremos de la linea de degradado para una caja, replicando la especificacion
 * CSS: la linea pasa por el centro, y su longitud es |w*sin(a)| + |h*cos(a)|.
 */
export function brandGradientLine(
  width: number,
  height: number,
  x = 0,
  y = 0,
  angleDeg: number = BRAND_ANGLE_DEG,
): GradientLine {
  const a = (angleDeg * Math.PI) / 180;
  // Direccion en coordenadas de pantalla (y hacia abajo): 0deg = arriba, 90deg = derecha.
  const dx = Math.sin(a);
  const dy = -Math.cos(a);
  const length = Math.abs(width * Math.sin(a)) + Math.abs(height * Math.cos(a));
  const cx = x + width / 2;
  const cy = y + height / 2;
  const half = length / 2;

  const round = (n: number) => Math.round(n * 1000) / 1000;
  return {
    x1: round(cx - dx * half),
    y1: round(cy - dy * half),
    x2: round(cx + dx * half),
    y2: round(cy + dy * half),
  };
}
