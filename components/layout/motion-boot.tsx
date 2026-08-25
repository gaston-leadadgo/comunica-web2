"use client";

import { useEffect } from "react";

import { refreshOnFontsReady } from "@/lib/gsap/use-brand-motion";

/**
 * Recalcula los ScrollTrigger cuando terminan de cargar las fuentes.
 *
 * Sin esto, los triggers se registran con las alturas de la fuente de reserva y
 * quedan desplazados unos cuantos pixeles en cuanto Space Grotesk entra en juego.
 * No renderiza nada.
 */
export function MotionBoot() {
  useEffect(() => {
    refreshOnFontsReady();
  }, []);
  return null;
}
