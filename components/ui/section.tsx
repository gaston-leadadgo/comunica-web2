import type { ReactNode } from "react";

import { BrandArc } from "@/components/brand/brand-arc";
import { cn } from "@/lib/utils/cn";

/**
 * El pilar de la estetica hibrida.
 *
 * Centraliza superficie, ritmo vertical y el flag `data-tone`. Cuando el tono es
 * oscuro se marca `data-tone="dark"`, y a partir de ahi Eyebrow, Button, Card y
 * el anillo de foco cambian de paleta por CSS: no hay que duplicar componentes
 * ni propagar props en cascada.
 *
 * Reglas de ritmo (ver plan): nunca dos secciones oscuras full-bleed seguidas,
 * la primera oscura aparece antes del 25% del scroll, y el CTA final siempre
 * lleva el degradado.
 */

export type SectionTone =
  | "light"
  | "warm"
  | "warm-2"
  | "navy"
  | "ink"
  | "abyss"
  | "gradient";

type SectionSpacing = "none" | "sm" | "base" | "lg";
type ContainerWidth = "default" | "narrow" | "wide" | "full";

const TONE_CLASS: Record<SectionTone, string> = {
  light: "bg-paper text-fg",
  warm: "bg-paper-warm text-fg",
  "warm-2": "bg-paper-warm-2 text-fg",
  navy: "bg-navy text-fg-inverse",
  ink: "bg-ink text-fg-inverse",
  abyss: "bg-abyss text-fg-inverse",
  gradient: "bg-brand-gradient-flip text-fg-inverse",
};

const DARK_TONES: SectionTone[] = ["navy", "ink", "abyss", "gradient"];

const SPACING_CLASS: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-section-sm",
  base: "py-section",
  lg: "py-section-lg",
};

const WIDTH_CLASS: Record<ContainerWidth, string> = {
  narrow: "max-w-[880px]",
  default: "max-w-[1240px]",
  wide: "max-w-[1440px]",
  full: "max-w-none",
};

export function Container({
  width = "default",
  className,
  children,
}: {
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-gutter", WIDTH_CLASS[width], className)}>
      {children}
    </div>
  );
}

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  width?: ContainerWidth;
  /** Salta el Container: el contenido llega a los bordes del viewport. */
  bleed?: boolean;
  arc?: {
    placement?: "edge" | "seam" | "focus";
    tone?: "gradient" | "cyan" | "navy" | "white";
    flip?: boolean;
    weight?: number;
    opacity?: number;
    className?: string;
    draw?: boolean;
  };
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "header" | "footer";
};

export function Section({
  id,
  tone = "light",
  spacing = "base",
  width = "default",
  bleed = false,
  arc,
  className,
  children,
  as: Tag = "section",
}: SectionProps) {
  const isDark = DARK_TONES.includes(tone);

  return (
    <Tag
      id={id}
      data-tone={isDark ? "dark" : "light"}
      className={cn(
        "relative isolate",
        TONE_CLASS[tone],
        SPACING_CLASS[spacing],
        // El arco sangra por el borde, asi que la seccion recorta
        arc && "overflow-hidden",
        className,
      )}
    >
      {arc ? (
        <BrandArc
          placement={arc.placement ?? "edge"}
          tone={arc.tone ?? (isDark ? "white" : "gradient")}
          flip={arc.flip}
          weight={arc.weight}
          opacity={arc.opacity ?? (isDark ? 0.9 : 0.55)}
          draw={arc.draw}
          className={cn(
            arc.placement === "edge" &&
              "inset-y-0 right-0 h-full w-[clamp(60px,10vw,140px)]",
            arc.placement === "seam" &&
              "-top-px left-1/2 w-[min(760px,86vw)] -translate-x-1/2",
            arc.placement === "focus" && "top-0 right-0 size-[min(320px,40vw)]",
            arc.className,
          )}
        />
      ) : null}

      {bleed ? children : <Container width={width}>{children}</Container>}
    </Tag>
  );
}
