import { cn } from "@/lib/utils/cn";

/**
 * Motivo de codigo QR para los mockups de Extension Dinamica.
 *
 * NO es un QR escaneable, y es a proposito: un codigo real dentro de una web
 * apunta a una URL real, y aqui lo que se ilustra es el adhesivo que hay EN LA
 * HABITACION del hotel, no un enlace que el visitante deba escanear desde la
 * pantalla del ordenador. Va `aria-hidden` por lo mismo: es una ilustracion del
 * producto, no un control.
 *
 * El patron se genera con una funcion determinista (no `Math.random()`), porque
 * el componente se renderiza tambien en el servidor: con aleatoriedad, servidor
 * y cliente pintarian matrices distintas y React abortaria la hidratacion.
 *
 * Estructura de un QR real, que es lo que hace que se reconozca al instante:
 * tres cuadros localizadores en las esquinas, zona de silencio alrededor y una
 * malla de modulos entre medias.
 */

const GRID = 21; // Version 1 de la especificacion QR: 21x21 modulos.
const QUIET = 2; // Zona de silencio, en modulos.

/** Los tres localizadores ocupan 7x7 en tres de las cuatro esquinas. */
function isFinderZone(row: number, col: number) {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= GRID - 7;
  const inBottomLeft = row >= GRID - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}

/**
 * Hash entero barato y estable. Da la misma matriz en cada render, en servidor
 * y en cliente, sin necesidad de precalcular ni de pasar una semilla.
 */
function isModuleOn(row: number, col: number) {
  const h = (row * 73856093) ^ (col * 19349663) ^ ((row + col) * 83492791);
  return (h >>> 3) % 100 < 46;
}

export function QrMotif({ className }: { className?: string }) {
  const size = GRID + QUIET * 2;
  const modules: { x: number; y: number }[] = [];

  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      if (isFinderZone(row, col)) continue;
      if (!isModuleOn(row, col)) continue;
      modules.push({ x: col + QUIET, y: row + QUIET });
    }
  }

  const finders: [number, number][] = [
    [QUIET, QUIET],
    [QUIET + GRID - 7, QUIET],
    [QUIET, QUIET + GRID - 7],
  ];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn("block", className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} fill="#fff" />

      {modules.map((m) => (
        <rect
          key={`${m.x}-${m.y}`}
          x={m.x}
          y={m.y}
          width={1}
          height={1}
          fill="var(--color-ink)"
        />
      ))}

      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={7} height={7} fill="var(--color-ink)" />
          <rect x={x + 1} y={y + 1} width={5} height={5} fill="#fff" />
          <rect x={x + 2} y={y + 2} width={3} height={3} fill="var(--color-ink)" />
        </g>
      ))}
    </svg>
  );
}
