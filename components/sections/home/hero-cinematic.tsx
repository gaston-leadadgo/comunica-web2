"use client";

import { BrandArc } from "@/components/brand/brand-arc";
import { SIZES, SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HotelText } from "@/components/ui/hotel-text";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Hero cinematografico centrado.
 *
 * Contiene EXACTAMENTE cuatro cosas: titular, subtitulo y dos llamadas a la
 * accion. Es la estructura acordada en la revision de cliente. Lo que se ha
 * quitado y por que:
 *
 * - El eyebrow "Tecnologia hotelera, resuelta". Era la referencia explicita a
 *   tecnologia hotelera en lo mas alto del sitio que se pidio eliminar. El copy
 *   no se pierde: sigue siendo el titular de la seccion de propuesta de valor,
 *   donde ya venia en la demo aprobada.
 * - La cifra de credibilidad tampoco entra aqui. Gana protagonismo en la
 *   cabecera fija (350 en display) y en la banda inmediatamente posterior. En el
 *   hero le quitaria aire al titular, que es lo que se pedia ganar.
 *
 * El titular va partido en dos lineas desde el copy, y aqui se renderizan como
 * dos bloques. No es decoracion: garantiza el corte en el sitio donde el copy lo
 * pensó y evita que el navegador reparta 83 caracteres en tres lineas. A 56px la
 * linea larga mide ~1.150px y el contenedor tiene 1.216px.
 *
 * El titular y el subtitulo se renderizan en su estado final: la entrada se
 * anima con `gsap.from()`, nunca con `opacity: 0` en CSS. Es la unica regla que
 * hace posible que el hero respire a pantalla completa (100dvh, ver mas abajo)
 * y siga siendo el elemento LCP: el HTML llega ya con el titular visible, y el
 * `dvh` (no `vh`) evita que la barra de direccion del movil recorte el calculo.
 */
export function HeroCinematic() {
  const { hero } = home;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;

    const lines = scope.querySelectorAll<HTMLElement>("[data-line]");
    const rest = scope.querySelectorAll<HTMLElement>("[data-lead],[data-ctas]");

    gsap.from(lines, {
      opacity: 0,
      y: 28,
      duration: 0.8,
      ease: "power3.out",
      immediateRender: true,
      stagger: 0.1,
    });
    gsap.from(rest, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      delay: 0.25,
      ease: "power3.out",
      immediateRender: true,
      stagger: 0.1,
    });
  });

  return (
    <section
      data-tone="light"
      className="relative isolate flex min-h-dvh items-center overflow-hidden bg-paper pt-[calc(var(--header-h)+clamp(2rem,5vw,3.5rem))] pb-16"
    >
      {/* Fondo a sangre + lavado radial. Nada de color plano.
          La foto sube al 38 %: se reconoce la recepcion del hotel con claridad
          sin convertirse en la protagonista. El opacity es el unico numero que
          hay que tocar para calibrarla.
          La mascara radial vacia el centro del encuadre (donde caen el titular,
          el subtitulo y los botones) y deja la foto al maximo en los bordes: se
          nota mas imagen sin perder ni un punto de contraste en el texto. */}
      <div className="absolute inset-0 -z-20">
        <SmartImage
          image="home-hero-lobby-umbral"
          sizes={SIZES.heroFull}
          priority
          decorative
          wrapperClassName="absolute inset-0 !aspect-auto h-full w-full"
          className="opacity-[0.38] [mask-image:radial-gradient(95%_75%_at_50%_46%,transparent_0%,rgba(0,0,0,0.4)_38%,#000_70%)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="bg-dot-grid absolute inset-0 -z-20 opacity-70"
      />
      <div aria-hidden="true" className="bg-radial-wash absolute inset-0 -z-10" />

      <BrandArc
        placement="edge"
        tone="gradient"
        weight={2}
        opacity={0.45}
        draw
        className="inset-y-0 right-0 -z-10 h-full w-[clamp(80px,14vw,220px)]"
      />

      <Container width="wide" className="relative">
        <div ref={scope} className="mx-auto max-w-[76rem] text-center">
          <h1 className="text-display-hero">
            <span data-line className="block text-balance">
              <HotelText>{hero.titleLine1}</HotelText>
            </span>{" "}
            <span data-line className="mt-1 block text-balance text-cyan-strong">
              {hero.titleLine2}
            </span>
          </h1>

          {/* Subtitulo mas ancho que `measure-lead`: centrado y a 19px, 74
              caracteres por linea siguen siendo comodos y caben en 3 lineas en
              lugar de 4. */}
          <p
            data-lead
            className="mx-auto mt-7 max-w-[46rem] text-lead text-fg-muted"
          >
            {hero.lead}
          </p>

          <div
            data-ctas
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              href={hero.ctas[0].href}
              size="lg"
              variant="navy"
              iconRight={<Icon name="arrow-right" size={18} />}
              className="w-full sm:w-auto"
            >
              {hero.ctas[0].label}
            </Button>
            <Button
              href={hero.ctas[1].href}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="file-text" size={17} />
                {hero.ctas[1].label}
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
