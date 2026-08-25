import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Etiqueta de seccion en mono, mayusculas y tracking ancho.
 *
 * El color cambia solo con el tono de la seccion padre, sin pasar props:
 * - sobre claro usa `cyan-ink-strong` (#005E86, 7,13:1) porque a 11px el cyan
 *   de marca sobre blanco daria 2,97:1 y seria ilegible;
 * - sobre oscuro usa el cyan de marca, que ahi si pasa AA.
 *
 * Va siempre precedido de un indice (`01`) o de una raya, como en una revista.
 */
export function Eyebrow({
  children,
  index,
  as: Tag = "p" as ElementType,
  className,
}: {
  children: ReactNode;
  /** Indice tipo revista: `01`, `02`... Se renderiza antes de la etiqueta. */
  index?: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-eyebrow uppercase",
        "text-cyan-ink-strong [[data-tone=dark]_&]:text-cyan",
        "flex items-center gap-2.5",
        className,
      )}
    >
      {index ? (
        <>
          <span className="text-fg-muted [[data-tone=dark]_&]:text-fg-inverse-muted">
            {index}
          </span>
          <span
            aria-hidden="true"
            className="h-px w-6 bg-current opacity-40"
          />
        </>
      ) : (
        <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
      )}
      <span>{children}</span>
    </Tag>
  );
}
