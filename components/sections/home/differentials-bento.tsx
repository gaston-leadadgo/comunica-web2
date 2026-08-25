"use client";

import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { useRef, useState } from "react";

import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { home } from "@/content/home";
import { gsap, useBrandMotion } from "@/lib/gsap/use-brand-motion";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(Flip);

/**
 * Bento de diferenciales, interactivo.
 *
 * Verificacion de densidad con 6 columnas y `grid-flow-dense` — es la MISMA de
 * siempre, la interaccion no cambia la composicion:
 *   fila 1: tres huecos estrechos (span 2 cada uno)              = 6
 *   fila 2: hueco ancho (span 4) + imagen (span 2, dos filas)    = 6
 *   fila 3: hueco ancho (span 4) + la imagen sigue               = 6
 *
 * Lo que cambia al pulsar NO es la rejilla: son las tarjetas que la ocupan. Los
 * huecos tienen tamaño fijo y las cinco tarjetas se reparten entre ellos, con la
 * seleccionada siempre en el primer hueco ancho —el principal, en navy—. Pulsar
 * una tarjeta la lleva ahi y desplaza al resto un puesto.
 *
 * Esto es deliberado, y es lo contrario de lo que se intento antes: si las
 * celdas cambian de tamaño al seleccionarlas, la seccion entera crece o encoge
 * bajo el cursor, la pagina da un salto de scroll y la animacion tiene que
 * interpolar un reflujo completo (que es lo que se percibia como lentitud). Con
 * los huecos fijos, lo unico que se mueve son las tarjetas entre posiciones
 * conocidas: la altura de la seccion no varia ni un pixel.
 *
 * El movimiento es GSAP Flip porque `grid-column` y `grid-row` no son
 * propiedades interpolables por CSS: sin el, las tarjetas saltarian de hueco.
 */
export function DifferentialsBento() {
  const { differentials } = home;
  const [active, setActive] = useState(3);

  const gridRef = useRef<HTMLDivElement>(null);
  /** Instantanea previa al cambio. La consume el `useGSAP` de abajo. */
  const pending = useRef<Flip.FlipState | null>(null);

  const select = (index: number) => {
    if (index === active) return;
    const grid = gridRef.current;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (grid && !reduced) {
      pending.current = Flip.getState(grid.querySelectorAll("[data-card]"), {
        // El fondo y el color de texto cambian a la vez que la posicion. Sin
        // declararlos aqui, Flip solo interpola la geometria y el color salta
        // de golpe al empezar el desplazamiento.
        props: "backgroundColor,color",
      });
    }
    setActive(index);
  };

  // Corre en cuanto React ha aplicado el nuevo reparto, antes de pintar: es
  // cuando Flip puede medir el destino y animar desde la instantanea.
  useGSAP(
    () => {
      if (!pending.current) return;
      // Sin `absolute`. Con el, Flip saca las tarjetas del flujo durante la
      // transicion: la rejilla se queda vacia por dentro, colapsa de altura y
      // vuelve a crecer al terminar. Como aqui el DOM no se reordena y la
      // rejilla mantiene sus tres filas, no hace ninguna falta.
      Flip.from(pending.current, {
        duration: 0.4,
        ease: "power2.out",
      });
      pending.current = null;
    },
    { dependencies: [active] },
  );

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    const cells = gsap.utils.toArray<HTMLElement>("[data-cell]", scope);
    if (!cells.length) return;
    gsap.from(cells, {
      opacity: 0,
      y: 22,
      scale: 0.97,
      duration: 0.55,
      ease: "power2.out",
      immediateRender: true,
      stagger: { each: 0.07, from: "start", grid: "auto" },
      scrollTrigger: { trigger: scope, start: "top 78%", once: true },
    });
  });

  /**
   * Anchos por tarjeta. El orden del DOM NO cambia nunca: las cinco tarjetas
   * salen siempre en su orden natural (01 a 05) y lo unico que se recalcula es
   * cuantas columnas ocupa cada una.
   *
   * Reordenar el DOM fue el primer intento y estaba mal: con `grid-flow-dense`,
   * el navegador ya reordena por su cuenta para tapar huecos, asi que mover
   * ademas los nodos daba colocaciones impredecibles —y obligaba a Flip a sacar
   * las tarjetas del flujo para animarlas, que es de donde salia la sensacion
   * de que la seccion se rompia al pulsar.
   *
   * Aqui la seleccionada toma 4 columnas y, del resto, tres toman 2 y la ultima
   * toma 4. Sea cual sea la elegida, la suma por fila sigue dando 6 y la rejilla
   * conserva sus tres filas. Con la cuarta seleccionada (el valor inicial) el
   * reparto es exactamente el de siempre.
   */
  const last = differentials.items.length - 1;
  /** La segunda ancha: la ultima tarjeta, salvo que sea la seleccionada. */
  const secondWide = active === last ? last - 1 : last;

  const spanOf = (index: number) =>
    index === active || index === secondWide ? "lg:col-span-4" : "lg:col-span-2";

  return (
    <section data-tone="light" className="bg-paper-warm py-section">
      <Container width="wide">
        {/* Medida ancha a proposito. Son 93 caracteres y contienen
            "telecomunicaciones.", una palabra de 19: por debajo de ~1.240px el
            corte natural cae antes de esa palabra y el titular se va a tres
            lineas aunque geometricamente quepa en dos. */}
        <h2 className="mx-auto max-w-[46ch] text-center text-display-2 text-balance">
          <HotelText>{differentials.title}</HotelText>
        </h2>

        <div ref={scope}>
          <div
            ref={gridRef}
            className="mt-16 grid grid-flow-dense grid-cols-1 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-6"
          >
            {differentials.items.map((item, index) => {
              const isPrincipal = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  data-cell
                  data-card
                  data-tone={isPrincipal ? "dark" : undefined}
                  onClick={() => select(index)}
                  aria-pressed={isPrincipal}
                  className={cn(
                    "flex min-w-0 flex-col p-8 text-left transition-colors",
                    spanOf(index),
                    isPrincipal
                      ? "bg-navy text-fg-inverse"
                      : "bg-paper hover:bg-paper-warm-2",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-data",
                      isPrincipal ? "text-cyan" : "text-cyan-ink-strong",
                    )}
                    data-tabular
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "measure-card mt-5 text-display-3",
                      isPrincipal && "text-white",
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "measure-body mt-4 text-body-sm",
                      isPrincipal ? "text-fg-inverse-muted" : "text-fg-muted",
                    )}
                  >
                    {item.description}
                  </span>
                </button>
              );
            })}

            {/* Imagen a dos filas: cierra la rejilla */}
            <div
              data-cell
              className="relative min-w-0 bg-paper lg:col-span-2 lg:row-span-2"
            >
              <SmartImage
                image="home-differentials-engineer-hands"
                sizes={SIZES.grid3}
                decorative
                wrapperClassName="h-full !aspect-auto min-h-[18rem]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
