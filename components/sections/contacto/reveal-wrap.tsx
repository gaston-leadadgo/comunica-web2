"use client";

import type { ReactNode } from "react";

import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Envoltorio minimo para animar la entrada de Contacto.
 *
 * `app/contacto/page.tsx` es un Server Component (necesita `searchParams` como
 * promesa), asi que no puede usar hooks directamente. Este componente cliente
 * solo aporta el `ref` de scope; el contenido sigue viviendo en la pagina, que
 * lo pasa como `children` y marca con `data-reveal` lo que quiere animado.
 */
export function ContactoRevealWrap({ children }: { children: ReactNode }) {
  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    gsap.from(gsap.utils.toArray("[data-reveal]", scope), {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out",
      immediateRender: true,
      stagger: 0.12,
    });
  });

  return <div ref={scope}>{children}</div>;
}
