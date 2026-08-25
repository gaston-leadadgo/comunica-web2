"use client";

import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { capabilities } from "@/content/perfiles";
import { soluciones } from "@/content/soluciones";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Las siete capacidades, como muestrario tipografico.
 *
 * Siete piezas no caben en una rejilla limpia: 7 es primo, asi que cualquier
 * bento de 2, 3 o 4 columnas deja un hueco muerto. Y la home ya lleva dos bentos,
 * asi que repetirlo aqui seria monotono. La solucion es una tabla editorial de
 * filas a todo el ancho: indice en mono, titulo y descripcion. Escala a cualquier
 * numero de filas y se lee como una ficha tecnica, que es el tono de la pagina.
 *
 * La fila entera reacciona al puntero desplazandose unos pixeles, y el indice se
 * enciende. Sin eso serian siete lineas de texto.
 */
export function SolucionesCapabilities() {
  const scope = useBrandMotion<HTMLUListElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    const rows = gsap.utils.toArray<HTMLElement>("[data-row]", scope);
    gsap.from(rows, {
      opacity: 0,
      x: -16,
      duration: 0.4,
      ease: "power2.out",
      immediateRender: true,
      stagger: 0.05,
      scrollTrigger: { trigger: scope, start: "top 80%", once: true },
    });
  });

  return (
    <section id="capacidades" data-tone="light" className="bg-paper py-section">
      <Container>
        <h2 className="max-w-[26ch] text-display-2 text-balance">
          {soluciones.capabilities.title}
        </h2>

        <ul ref={scope} className="mt-14 border-t border-line">
          {capabilities.map((c, i) => (
            <li
              key={c.id}
              data-row
              className="group/row border-b border-line transition-colors hover:bg-paper-warm"
            >
              <div className="grid items-baseline gap-x-8 gap-y-3 px-2 py-7 transition-transform duration-300 ease-out-expo group-hover/row:translate-x-2 sm:grid-cols-[3.5rem_1fr] lg:grid-cols-[3.5rem_16rem_1fr] lg:px-4">
                <span
                  className="font-mono text-data text-fg-muted transition-colors group-hover/row:text-cyan-ink-strong"
                  data-tabular
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="flex items-center gap-3 text-display-3">
                  <Icon
                    name={c.icon}
                    size={19}
                    className="shrink-0 text-cyan-ink"
                  />
                  {c.title}
                </h3>

                <p className="measure-body text-body-sm text-fg-muted lg:col-start-3">
                  {c.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
