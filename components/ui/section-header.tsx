import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { Eyebrow } from "./eyebrow";

/**
 * Cabecera de seccion. Encapsula las medidas maximas en `ch`, que son la regla
 * que impide que un titular envuelva en seis lineas:
 *   display-1 -> 24ch | display-2 -> 20ch | display-3 -> 26ch | lead -> 46ch
 *
 * Los 46ch del lead son deliberados: el reflejo habitual es `max-w-2xl` (~70ch),
 * y es justo lo que hace que una pagina no parezca editorial.
 */

type Level = 1 | 2 | 3;

const TITLE_CLASS: Record<Level, string> = {
  1: "text-display-1 max-w-[24ch]",
  2: "text-display-2 max-w-[20ch]",
  3: "text-display-3 max-w-[26ch]",
};

export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  level = 2,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  level?: Level;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const Tag = (`h${level}` as const) satisfies "h1" | "h2" | "h3";
  const centered = align === "center";

  return (
    <div className={cn(centered && "flex flex-col items-center text-center", className)}>
      {eyebrow ? (
        <Eyebrow index={index} className={centered ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Tag className={cn("mt-6", TITLE_CLASS[level], centered && "mx-auto")}>
        {title}
      </Tag>

      {lead ? (
        <p
          className={cn(
            "mt-6 measure-lead text-lead text-fg-muted",
            "[[data-tone=dark]_&]:text-fg-inverse-muted",
            centered && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}

      {children}
    </div>
  );
}
