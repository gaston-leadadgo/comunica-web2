"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Icon } from "@/components/ui/icon";
import { stickyCta } from "@/content/nav";
import { routes } from "@/content/site";

/**
 * CTA flotante movil. No aparece en Contacto, que ya es el formulario.
 *
 * Reserva su propia altura en el <body> mientras esta visible: si no, tapa el
 * ultimo elemento enfocable de la pagina y rompe la navegacion por teclado.
 *
 * La reserva es un ATRIBUTO, no un valor de padding puesto a mano: la condicion
 * de ancho (>=1024px no hay barra) vive en CSS junto al `lg:hidden` de la barra,
 * en el mismo sitio. Poner aqui el valor en px y alli el `lg:hidden` es la forma
 * segura de que ambos se desincronicen: eso es lo que dejaba una franja blanca
 * vacia en escritorio, del alto exacto de una barra que ya no se veia.
 */
export function StickyMobileCta() {
  const pathname = usePathname();
  const hidden = pathname.startsWith(routes.contacto);

  useEffect(() => {
    const el = document.body;
    if (hidden) {
      el.removeAttribute("data-sticky-cta");
      return;
    }
    el.setAttribute("data-sticky-cta", "true");
    return () => {
      el.removeAttribute("data-sticky-cta");
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <Link
        href={stickyCta.href}
        className="bg-brand-gradient-flip flex h-12 w-full items-center justify-center gap-2 rounded-full font-semibold text-white"
      >
        {stickyCta.label}
        <Icon name="arrow-right" size={17} />
      </Link>
    </div>
  );
}
