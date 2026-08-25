import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * `cn` = clsx + tailwind-merge, con los tokens de tamano de texto declarados.
 *
 * Declararlos NO es opcional. tailwind-merge no conoce nuestra escala, y ante
 * `text-body` o `text-small` cae en su validador de color: los mete en el grupo
 * `text-color`. Como en `Button` el tamano se concatena DESPUES de la variante,
 * `cn(BASE, "text-white bg-navy", "h-13 px-7 text-body")` devolvia
 * `bg-navy h-13 px-7 text-body` — sin `text-white`.
 *
 * Efecto real medido en la home antes de este arreglo: todos los botones habian
 * perdido su color de texto y heredaban el del contexto, asi que el CTA navy
 * pintaba #1D1D1B sobre #003057 (1,25:1, ilegible) y el CTA cyan pintaba blanco
 * sobre cyan (2,97:1). Un fallo silencioso: ni el build ni el lint lo ven,
 * porque las clases estan escritas correctamente en el componente.
 *
 * Al registrar los literales en `font-size`, tailwind-merge los resuelve por
 * coincidencia exacta —que tiene prioridad sobre los validadores— y deja de
 * confundirlos con colores. Cualquier token nuevo de `--text-*` en globals.css
 * hay que anadirlo aqui tambien.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-1",
            "display-2",
            "display-3",
            "display-hero",
            "display-split",
            "card-title",
            "metric",
            "lead",
            "body",
            "body-sm",
            "small",
            "eyebrow",
            "data",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
