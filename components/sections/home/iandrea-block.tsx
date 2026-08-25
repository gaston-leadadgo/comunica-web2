"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";
import { revealOnScroll, useBrandMotion } from "@/lib/gsap/use-brand-motion";
import { cn } from "@/lib/utils/cn";

/**
 * Bloque de iAndrea.
 *
 * Correccion de la revision de cliente: el pretitulo se llevaba cinco renglones.
 * La causa era tratar una frase de 72 caracteres como un eyebrow —mono, 11px,
 * versalitas, caja de 27ch—, cuando no es una etiqueta de seccion sino el
 * argumento de venta del bloque. Ahora se compone como lo que es: una frase, en
 * la tipografia de texto, a tamano de entradilla y con medida ancha. Cae en dos
 * lineas y ademas se lee, que es lo que se le pide a una frase.
 *
 * El titulo baja de 88px a 64px por la misma razon: "iAndrea" funciona como
 * logotipo de producto sin necesidad de ocupar un tercio de la pantalla.
 *
 * La imagen de la columna derecha (`home-iandrea-voice-ai`) es el unico asset del
 * proyecto con gradacion C, y conviene entender por que antes de "corregirla"
 * para que encaje con las demas fotos.
 *
 * Historia corta: primero fue una plancha Tier B —movil con la pantalla en navy
 * plano y la interfaz compuesta por CSS encima— pero ese overlay nunca se
 * construyo, asi que en pantalla habia un movil apagado. Despues se probo una
 * foto sobria de recepcion vacia de noche, dentro de la direccion de arte de la
 * serie. Tambien fallaba, y por un motivo mas de fondo: esta es la seccion que
 * explica QUE ES iAndrea, y la regla general del proyecto —que la tecnologia sea
 * incidental para no parecer una telco— aqui juega justo en contra. Quien llega
 * a este bloque quiere ver el producto.
 *
 * Asi que esta imagen es declaradamente tecnologica y esta alineada con las
 * creatividades de campaña de iAndrea: interfaz de voz luminosa, ondas, burbujas
 * de conversacion, iconos conectados. Lo unico que hereda de la serie es la
 * paleta de marca y la prohibicion de texto dentro de la imagen, esa por motivos
 * tecnicos: un modelo de difusion escribe jerigonza.
 */
export function IandreaBlock() {
  const { iandrea } = home;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-reveal-l]", { stagger: 0.1, start: "top 75%" });
    revealOnScroll(gsap, scope, "[data-reveal-r]", {
      stagger: 0.1,
      start: "top 75%",
      delay: 0.15,
    });
  });

  // Scope propio para la rejilla de capacidades: vive FUERA del `div` de las dos
  // columnas, y `gsap.utils.toArray(selector, scope)` solo busca descendientes.
  // Con un unico scope arriba, estos `[data-cap]` no se encontrarian nunca.
  const capsScope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    revealOnScroll(gsap, scope, "[data-caps-label]", { start: "top 85%" });
    const caps = gsap.utils.toArray<HTMLElement>("[data-cap]", scope);
    if (!caps.length) return;
    gsap.from(caps, {
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: 0.5,
      ease: "power2.out",
      immediateRender: true,
      stagger: { each: 0.06, from: "start", grid: "auto" },
      scrollTrigger: { trigger: scope, start: "top 82%", once: true },
    });
  });

  return (
    <section
      id="iandrea"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-navy py-section text-fg-inverse"
    >
      <BrandArc
        placement="edge"
        tone="white"
        opacity={0.4}
        flip
        className="inset-y-0 left-0 -z-10 h-full w-[clamp(70px,12vw,180px)]"
      />

      <Container width="wide">
        <div ref={scope} className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="min-w-0">
            {/* Frase de apertura, no eyebrow. Barra en degradado a la izquierda
                para que siga leyendose como antesala del titulo. */}
            <p data-reveal-l className="relative max-w-[34ch] pl-5 text-lead text-cyan-soft">
              <span
                aria-hidden="true"
                className="bg-brand-gradient absolute top-1 left-0 h-[calc(100%-0.5rem)] w-[3px] rounded-full"
              />
              {iandrea.eyebrow}
            </p>

            <div data-reveal-l>
              <h2 className="mt-7 text-display-2 text-white">{iandrea.title}</h2>
              <p className="mt-2 max-w-[30ch] text-display-3 text-cyan">
                {iandrea.subtitle}
              </p>
            </div>

            <div data-reveal-l className="mt-9 flex flex-col gap-4">
              {iandrea.body.map((p, i) => (
                <p
                  key={p}
                  className={cn(
                    "measure-body",
                    i === iandrea.bodyHighlightIndex
                      ? "text-display-3 text-white"
                      : "text-body-sm text-fg-inverse-muted",
                  )}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Beneficios: tres celdas exactas, medianiles de 1px */}
            <ul
              data-reveal-l
              className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/12 sm:grid-cols-3"
            >
              {iandrea.benefits.map((b) => (
                <li
                  key={b}
                  className="flex min-w-0 items-center gap-2.5 bg-navy p-4"
                >
                  <Icon name="check" size={15} className="shrink-0 text-cyan" />
                  <span className="text-body-sm font-semibold text-white">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plancha + cierre */}
          <div className="min-w-0">
            <div data-reveal-r>
              <SmartImage
                image="home-iandrea-voice-ai"
                sizes={SIZES.heroSplit}
                decorative
                wrapperClassName="rounded-shield"
              />
            </div>

            <div
              data-reveal-r
              className="rounded-shield mt-7 border border-white/12 bg-white/[0.04] p-6"
            >
              <p className="measure-body text-body-sm text-fg-inverse-muted">
                {iandrea.closing}
              </p>
              <p className="measure-body mt-3 text-card-title text-cyan">
                {iandrea.closingHighlight}
              </p>
            </div>

            <div data-reveal-r className="mt-7">
              <Button
                href={iandrea.cta.href}
                variant="cyan"
                size="lg"
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                {iandrea.cta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* "iAndrea puede:" — la enumeracion, ya como rejilla.
            ---------------------------------------------------------------
            Estas siete capacidades venian embutidas en tres parrafos que
            empezaban por "Puede...". En prosa, siete acciones seguidas se leen
            como un solo bloque gris y no se retiene ninguna. Con icono, titulo
            y una linea de detalle, cada una se lee por separado y se puede
            escanear sin leer.

            Rejilla de 6 columnas: 7 items no dan filas exactas, asi que el
            septimo (el de integraciones, el mas denso) ocupa `col-span-2`
            —doble ancho— y cierra la segunda fila sin dejar hueco:
            3+3 | 2+2+2 -> con el ultimo a doble, 3+3 y 2+2+2 encajan. */}
        <div ref={capsScope} className="mt-16">
          <p
            data-caps-label
            className="font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase"
          >
            {iandrea.canLabel}
          </p>

          <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/12 sm:grid-cols-2 lg:grid-cols-6">
            {iandrea.capabilities.map((c, i) => (
              <li
                key={c.title}
                data-cap
                className={cn(
                  "flex min-w-0 flex-col bg-navy p-6 transition-colors hover:bg-navy-deep",
                  // 2+2+2 | 3+3 | 3+3 = tres filas exactas de 6 para 7 items.
                  // Cero celdas muertas.
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-cyan/12 text-cyan">
                  <Icon name={c.icon} size={18} />
                </span>
                <h3 className="mt-4 text-card-title text-white">{c.title}</h3>
                <p className="mt-2 text-small text-fg-inverse-muted">
                  {c.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
