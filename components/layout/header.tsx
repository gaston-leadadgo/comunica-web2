"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { headerClaim, headerCtas, headerNav } from "@/content/nav";
import { darkHeroRoutes, routes } from "@/content/site";
import { cn } from "@/lib/utils/cn";

/**
 * Cabecera: pildora flotante de cristal.
 *
 * No es una barra pegada al borde superior. Flota con margen, se redondea y al
 * bajar gana desenfoque y borde. Es lo que hace que el hero se lea como una
 * portada y no como una web con una barra encima.
 *
 * Dos decisiones de fondo frente al prototipo:
 * - Navega con <Link> y URLs reales, no con `onClick={setTab}`. El prototipo era
 *   una SPA de pestanas: no habia Cmd+click, ni abrir en pestana nueva, ni forma
 *   de compartir una seccion interior, ni indexacion.
 * - Publica su altura medida en `--header-h`, que es lo que usan el
 *   `scroll-margin-top` de las anclas y las columnas fijas.
 *
 * El menu guarda para QUE ruta esta abierto, en lugar de un booleano que haya que
 * resetear en un efecto al navegar: asi el cierre es estado derivado y no provoca
 * un render en cascada.
 */
export function Header() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /**
   * ¿La cabecera flota sobre un hero oscuro?
   *
   * Sin scroll la pildora es transparente y su contenido cae directamente sobre
   * la primera seccion. En Partners esa seccion es navy, y ahi el logotipo en
   * Process Black y los enlaces en tinta quedaban ilegibles sobre azul.
   *
   * Se deriva de la ruta durante el render, no de un efecto que mida el DOM: un
   * efecto solo puede leer el tono DESPUES de pintar, asi que en cada carga de
   * Partners la cabecera aparecia un instante en su version oscura antes de
   * corregirse. Derivado, sale bien ya en el primer pintado (y tambien en el
   * HTML del servidor). La lista vive en `content/site.ts`, junto a las rutas.
   */
  const overDark = darkHeroRoutes.includes(pathname);

  /** Solo mientras la pildora es transparente: al hacer scroll gana fondo claro. */
  const inverted = overDark && !scrolled && !open;

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === routes.home ? pathname === href : pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 px-gutter pt-3 sm:pt-4"
    >
      <div
        // `data-tone="dark"` cuando la pildora flota sobre un hero oscuro: es
        // el mismo interruptor que ya usan `Button` y el anillo de foco en el
        // resto del sitio, asi que la variante primaria pasa sola a blanco
        // sobre navy en lugar de quedarse navy sobre navy.
        data-tone={inverted ? "dark" : undefined}
        className={cn(
          "mx-auto flex max-w-[1320px] items-center gap-4 rounded-full px-4 py-2.5 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 sm:px-5",
          scrolled || open
            ? "border border-line bg-paper/80 shadow-sm backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        )}
      >
        {/* Logo + cifra, alineados por la MISMA linea base.
            ---------------------------------------------------------------
            Peticion de cliente: los dos textos tenian "pisos" distintos. La
            causa era que ambos eran hermanos de un contenedor `items-center`,
            que centra por la caja y no por el texto: el logo, mas alto,
            quedaba con su base por debajo de la del "350".

            Se agrupan aparte con `items-baseline`. Un SVG es un elemento
            reemplazado y su linea base ES su borde inferior, asi que la base
            del logotipo cae exactamente sobre la base de la cifra. El grupo
            entero sigue centrado dentro de la pildora. */}
        <div className="flex shrink-0 items-baseline gap-4">
          <Link
            href={routes.home}
            className="shrink-0 rounded-full"
            aria-label="Comunica, ir a la portada"
          >
            <Logo
              height={30}
              variant={inverted ? "negativo" : "principal"}
              decorative
            />
          </Link>

          {/* Indicador de credibilidad. La cifra en display 700 da
              protagonismo al 350; la unidad va en mono para que el conjunto se
              lea como instrumentacion y no como un adorno. */}
          <p
            className={cn(
              "hidden shrink-0 items-baseline gap-1.5 border-l pl-4 md:flex",
              inverted ? "border-white/25" : "border-line",
            )}
          >
            <span
              data-tabular
              className={cn(
                "font-display text-[1.0625rem] leading-none font-bold",
                inverted ? "text-white" : "text-navy",
              )}
            >
              {headerClaim.count}
            </span>
            {/* El espacio va dentro del texto, no solo en el `gap`: sin el, un
                lector de pantalla anuncia "350hoteles". */}
            <span
              className={cn(
                "font-mono text-[0.6875rem] tracking-[0.12em] whitespace-nowrap uppercase",
                inverted ? "text-fg-inverse-muted" : "text-fg-muted",
              )}
            >
              {` ${headerClaim.unit}`}
              <span
                aria-hidden="true"
                className={cn("mx-1.5", inverted ? "text-white/35" : "text-line")}
              >
                ·
              </span>
              <span data-tabular>{headerClaim.countries}</span>
            </span>
          </p>
        </div>

        <nav
          aria-label="Navegacion principal"
          className="ml-auto hidden items-center lg:flex"
        >
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-body-sm font-semibold transition-colors",
                // Sobre navy, el cyan de marca (4,53:1) y el blanco (13,46:1)
                // pasan AA; el `cyan-ink` de fondo claro se hundiria en el azul.
                inverted
                  ? isActive(item.href)
                    ? "text-cyan"
                    : "text-white hover:text-cyan"
                  : isActive(item.href)
                    ? "text-cyan-ink"
                    : "text-fg hover:text-cyan-ink",
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <span
                  aria-hidden="true"
                  className="bg-brand-gradient absolute inset-x-4 bottom-1 h-[2px] rounded-full"
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link
            href={headerCtas.secondary.href}
            className={cn(
              "hidden items-center gap-2 rounded-full border px-4 py-2 text-body-sm font-semibold transition-colors lg:inline-flex",
              inverted
                ? "border-white/35 text-white hover:border-white hover:bg-white hover:text-navy"
                : "border-line text-navy hover:border-navy hover:bg-navy hover:text-white",
            )}
          >
            <Icon name="file-text" size={15} />
            {headerCtas.secondary.label}
          </Link>

          <Button
            href={headerCtas.primary.href}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {headerCtas.primary.label}
          </Button>

          <button
            type="button"
            onClick={() => setOpenFor(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-paper text-navy lg:hidden"
          >
            <Icon name={open ? "x" : "menu"} size={19} />
          </button>
        </div>
      </div>

      {/* Panel movil */}
      <div
        id="menu-movil"
        hidden={!open}
        className="mx-auto mt-2 max-w-[1320px] rounded-2xl border border-line bg-paper p-5 shadow-md lg:hidden"
      >
        <ul className="flex flex-col">
          {headerNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between border-b border-line py-4 text-display-3",
                  isActive(item.href) ? "text-cyan-ink" : "text-fg",
                )}
              >
                {item.label}
                <Icon name="arrow-right" size={18} />
              </Link>
            </li>
          ))}
        </ul>

        <p
          data-tabular
          className="mt-5 font-mono text-data font-semibold text-navy"
        >
          {headerClaim.inline}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Button href={headerCtas.primary.href} size="lg" className="w-full">
            {headerCtas.primary.label}
          </Button>
          <Button
            href={headerCtas.mobileSecondary.href}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <span className="inline-flex items-center gap-2">
              <Icon name="file-text" size={16} />
              {headerCtas.mobileSecondary.label}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
