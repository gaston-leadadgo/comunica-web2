"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { Container } from "@/components/ui/section";
import { nosotros } from "@/content/nosotros";
import { site } from "@/content/site";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * La cifra: 350 hoteles, 13 paises.
 *
 * Los 13 paises NO son un mapa. Un planisferio con puntos y arcos es el cliche
 * exacto del genero telco y le serviria igual a cualquier competidor. Aqui son 13
 * tarjetas llave alineadas en cuadricula: el objeto que solo existe en un hotel,
 * repetido tantas veces como paises. Una de ellas va en cyan, que es el unico
 * acento de la seccion.
 *
 * Los contadores: el numero se renderiza ya en su valor final en el HTML y GSAP lo
 * anima desde cero al entrar en pantalla. Si el JS no llega, se lee 350. Nunca al
 * contrario.
 */
export function NosotrosScale() {
  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    const counters = gsap.utils.toArray<HTMLElement>("[data-count]", scope);
    counters.forEach((el) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.2,
        ease: "power2.out",
        immediateRender: true,
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
        scrollTrigger: { trigger: scope, start: "top 78%", once: true },
      });
    });

    const cards = gsap.utils.toArray<HTMLElement>("[data-keycard]", scope);
    gsap.from(cards, {
      opacity: 0,
      y: 10,
      duration: 0.35,
      ease: "power2.out",
      immediateRender: true,
      stagger: 0.04,
      scrollTrigger: { trigger: scope, start: "top 78%", once: true },
    });
  });

  const countries = Number(site.claims.countries);

  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden bg-abyss py-section text-fg-inverse"
    >
      <div aria-hidden="true" className="bg-radial-wash absolute inset-0 -z-10 opacity-80" />
      <BrandArc
        placement="edge"
        tone="white"
        opacity={0.45}
        className="inset-y-0 right-0 -z-10 h-full w-[clamp(70px,12vw,180px)]"
      />

      <Container width="wide">
        <div ref={scope}>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Las cifras */}
            <div className="min-w-0">
              <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
                {nosotros.scale.claim}
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-x-12 gap-y-6">
                <p className="text-metric text-white" data-tabular>
                  <span data-count={site.claims.hotels}>{site.claims.hotels}</span>
                  <span className="ml-3 align-baseline font-mono text-data text-fg-inverse-muted">
                    hoteles
                  </span>
                </p>
                <p className="text-metric text-cyan" data-tabular>
                  <span data-count={site.claims.countries}>
                    {site.claims.countries}
                  </span>
                  <span className="ml-3 align-baseline font-mono text-data text-fg-inverse-muted">
                    paises
                  </span>
                </p>
              </div>

              {/* Las 13 tarjetas llave: una por pais, sin mapa */}
              <ul
                aria-hidden="true"
                className="mt-10 flex max-w-[22rem] flex-wrap gap-2"
              >
                {Array.from({ length: countries }, (_, i) => (
                  <li
                    key={i}
                    data-keycard
                    className={
                      i === 4
                        ? "h-8 w-12 rounded-[3px] bg-cyan"
                        : "h-8 w-12 rounded-[3px] border border-white/20 bg-white/[0.07]"
                    }
                  />
                ))}
              </ul>
            </div>

            {/* El argumento */}
            <div className="min-w-0">
              <div className="flex flex-col gap-5">
                {nosotros.scale.body.map((p) => (
                  <p key={p} className="measure-body text-body text-fg-inverse-muted">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-8 border-l-2 border-cyan pl-5 text-display-3 text-white">
                {nosotros.scale.highlight}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
