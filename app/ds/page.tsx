import type { Metadata } from "next";

import { BrandArc } from "@/components/brand/brand-arc";
import { BrandSymbol, Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container, Section, type SectionTone } from "@/components/ui/section";
import { contrastRatio, formatRatio, wcagLevel } from "@/lib/utils/contrast";

export const metadata: Metadata = {
  title: "Sistema de diseno",
  robots: { index: false, follow: false },
};

const PALETTE = [
  { token: "--color-ink", hex: "#1D1D1B", name: "Process Black C", brand: true },
  { token: "--color-cyan", hex: "#009FE3", name: "Process Cyan C", brand: true },
  { token: "--color-navy", hex: "#003057", name: "Pantone 540 C", brand: true },
  { token: "--color-cyan-ink", hex: "#0077A8", name: "Cyan tinta" },
  { token: "--color-cyan-ink-strong", hex: "#005E86", name: "Cyan tinta fuerte" },
  { token: "--color-cyan-strong", hex: "#0089C4", name: "Cyan titular" },
  { token: "--color-cyan-soft", hex: "#4FC3F1", name: "Cyan sobre oscuro" },
  { token: "--color-abyss", hex: "#0A1A2B", name: "Abismo" },
  { token: "--color-paper-warm", hex: "#FAFAF8", name: "Papel calido" },
  { token: "--color-paper-warm-2", hex: "#F1EFEC", name: "Papel calido 2" },
  { token: "--color-fg-muted", hex: "#5A5A57", name: "Texto secundario" },
  { token: "--color-fg-inverse-muted", hex: "#C7CDD4", name: "Texto secundario inv." },
  { token: "--color-positive", hex: "#0F7A52", name: "Positivo" },
  { token: "--color-positive-soft", hex: "#34D399", name: "Positivo oscuro" },
  { token: "--color-critical", hex: "#B3261E", name: "Critico" },
  { token: "--color-critical-soft", hex: "#FF8A80", name: "Critico oscuro" },
];

const CONTRAST_PAIRS: {
  fg: string;
  bg: string;
  use: string;
  large?: boolean;
  mustPass: boolean;
}[] = [
  { fg: "#009FE3", bg: "#FFFFFF", use: "Cyan de marca como texto sobre blanco", mustPass: false },
  { fg: "#FFFFFF", bg: "#009FE3", use: "Blanco sobre relleno cyan (boton)", mustPass: false },
  { fg: "#1D1D1B", bg: "#009FE3", use: "Tinta sobre relleno cyan (boton correcto)", mustPass: true },
  { fg: "#0077A8", bg: "#FFFFFF", use: "Enlace / texto cyan sobre blanco", mustPass: true },
  { fg: "#0077A8", bg: "#FAFAF8", use: "Enlace cyan sobre papel calido", mustPass: true },
  { fg: "#005E86", bg: "#FFFFFF", use: "Eyebrow mono 11px sobre blanco", mustPass: true },
  { fg: "#0089C4", bg: "#FFFFFF", use: "Titular cyan >=24px bold", large: true, mustPass: true },
  { fg: "#009FE3", bg: "#003057", use: "Cyan de marca sobre navy", mustPass: true },
  { fg: "#009FE3", bg: "#1D1D1B", use: "Cyan de marca sobre tinta", mustPass: true },
  { fg: "#4FC3F1", bg: "#003057", use: "Cyan pequeno sobre navy", mustPass: true },
  { fg: "#1D1D1B", bg: "#FFFFFF", use: "Texto principal", mustPass: true },
  { fg: "#5A5A57", bg: "#FAFAF8", use: "Texto secundario sobre papel calido", mustPass: true },
  { fg: "#003057", bg: "#FFFFFF", use: "Navy sobre blanco", mustPass: true },
  { fg: "#FFFFFF", bg: "#003057", use: "Blanco sobre navy", mustPass: true },
  { fg: "#C7CDD4", bg: "#003057", use: "Texto secundario en footer navy", mustPass: true },
  { fg: "#0F7A52", bg: "#FFFFFF", use: "Solución Comunica (claro)", mustPass: true },
  { fg: "#34D399", bg: "#003057", use: "Solución Comunica (oscuro)", mustPass: true },
  { fg: "#B3261E", bg: "#FFFFFF", use: "Dolor principal (claro)", mustPass: true },
  { fg: "#FF8A80", bg: "#003057", use: "Dolor principal (oscuro)", mustPass: true },
];

const TONES: { tone: SectionTone; label: string }[] = [
  { tone: "light", label: "light" },
  { tone: "warm", label: "warm" },
  { tone: "warm-2", label: "warm-2" },
  { tone: "navy", label: "navy" },
  { tone: "ink", label: "ink" },
  { tone: "abyss", label: "abyss" },
  { tone: "gradient", label: "gradient (invertido)" },
];

function Ratio({ fg, bg, large }: { fg: string; bg: string; large?: boolean }) {
  const ratio = contrastRatio(fg, bg);
  const level = wcagLevel(ratio, large);
  const ok = level !== "fail";
  return (
    <span className="flex items-center gap-2 font-mono text-data" data-tabular>
      <span className={ok ? "text-positive" : "text-critical"}>
        {ok ? "PASA" : "FALLA"}
      </span>
      <span>{formatRatio(ratio)}</span>
      <span className="text-fg-muted">{level}</span>
    </span>
  );
}

export default function DesignSystemPage() {
  return (
    <main id="main">
      {/* ---------- Cabecera ---------- */}
      <Section tone="light" spacing="sm">
        <Eyebrow index="00">Sistema de diseno</Eyebrow>
        <h1 className="mt-6 max-w-[24ch] text-display-1">
          Comunica, capa de marca
        </h1>
        <p className="mt-6 max-w-[46ch] text-lead text-fg-muted">
          Ruta interna de verificacion. Tokens, tipografia, el arco de marca y la
          tabla de contraste con los ratios calculados en tiempo de render.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <Logo height={34} />
          <BrandSymbol size={40} />
          <div
            className="bg-brand-gradient h-10 w-64 rounded-full"
            title="linear-gradient(100deg, #003057, #009FE3)"
          />
        </div>
      </Section>

      {/* ---------- Logotipo en sus tres versiones ---------- */}
      <Section tone="warm" spacing="sm">
        <Eyebrow index="01">Logotipo</Eyebrow>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="flex h-36 items-center justify-center rounded-shield bg-paper">
            <Logo height={30} variant="principal" />
          </div>
          <div
            data-tone="dark"
            className="flex h-36 items-center justify-center rounded-shield bg-ink"
          >
            <Logo height={30} variant="negativo" />
          </div>
          <div
            data-tone="dark"
            className="flex h-36 items-center justify-center rounded-shield bg-cyan text-white"
          >
            <Logo height={30} variant="mono" />
          </div>
        </div>
        <p className="mt-4 font-mono text-data text-fg-muted">
          principal / negativo / monocromo &middot; proporcion 4,379:1 &middot;
          degradado a 100 grados
        </p>
      </Section>

      {/* ---------- Tipografia ---------- */}
      <Section tone="light">
        <Eyebrow index="02">Tipografia</Eyebrow>
        <div className="mt-10 space-y-10">
          <div>
            <p className="font-mono text-data text-fg-muted">
              display-1 &middot; Space Grotesk 700 &middot; max 24ch
            </p>
            <p className="mt-3 max-w-[24ch] text-display-1">
              Telecomunicaciones gestionadas para hoteles
            </p>
          </div>
          <div>
            <p className="font-mono text-data text-fg-muted">
              display-2 &middot; max 20ch
            </p>
            <p className="mt-3 max-w-[20ch] text-display-2">
              Alma de operador, vocacion de partner
            </p>
          </div>
          <div>
            <p className="font-mono text-data text-fg-muted">
              display-3 &middot; max 26ch
            </p>
            <p className="mt-3 max-w-[26ch] text-display-3">
              Conocemos PMS, portal cautivo y recepcion
            </p>
          </div>
          <div>
            <p className="font-mono text-data text-fg-muted">
              lead &middot; Plus Jakarta 400 &middot; max 46ch (no 70ch)
            </p>
            <p className="mt-3 max-w-[46ch] text-lead text-fg-muted">
              Diseñamos, desplegamos y gestionamos voz, datos, WiFi, movilidad e
              inteligencia artificial con soporte cercano y una propuesta clara
              desde el primer dia.
            </p>
          </div>
          <div>
            <p className="font-mono text-data text-fg-muted">
              metric &middot; tabular-nums
            </p>
            <p className="mt-3 text-metric text-navy" data-tabular>
              350+
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- Tabla de contraste ---------- */}
      <Section tone="warm">
        <Eyebrow index="03">Contraste WCAG</Eyebrow>
        <h2 className="mt-6 max-w-[20ch] text-display-3">
          El cyan de marca no es un color de texto sobre blanco
        </h2>
        <p className="mt-5 max-w-[46ch] text-body text-fg-muted">
          Las dos primeras filas son las que hay que evitar. Las demás son la
          paleta operativa. Los ratios se calculan al renderizar, así que esta
          tabla no puede quedarse desfasada.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-4 font-mono text-eyebrow uppercase text-fg-muted">
                  Muestra
                </th>
                <th className="py-3 pr-4 font-mono text-eyebrow uppercase text-fg-muted">
                  Uso
                </th>
                <th className="py-3 pr-4 font-mono text-eyebrow uppercase text-fg-muted">
                  Colores
                </th>
                <th className="py-3 font-mono text-eyebrow uppercase text-fg-muted">
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              {CONTRAST_PAIRS.map((pair) => {
                const ratio = contrastRatio(pair.fg, pair.bg);
                const passes = wcagLevel(ratio, pair.large) !== "fail";
                const unexpected = passes !== pair.mustPass;
                return (
                  <tr
                    key={`${pair.fg}-${pair.bg}-${pair.use}`}
                    className="border-b border-line align-middle"
                  >
                    <td className="py-3 pr-4">
                      <span
                        className="inline-flex h-11 min-w-[132px] items-center justify-center rounded-md px-3"
                        style={{ background: pair.bg, color: pair.fg }}
                      >
                        <span
                          className={
                            pair.large
                              ? "text-[26px] leading-none font-bold"
                              : "text-small"
                          }
                        >
                          Comunica
                        </span>
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-small">
                      {pair.use}
                      {unexpected ? (
                        <strong className="ml-2 text-critical">
                          revisar: no es lo esperado
                        </strong>
                      ) : null}
                    </td>
                    <td className="py-3 pr-4 font-mono text-data text-fg-muted">
                      {pair.fg} / {pair.bg}
                    </td>
                    <td className="py-3">
                      <Ratio fg={pair.fg} bg={pair.bg} large={pair.large} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ---------- Paleta ---------- */}
      <Section tone="light">
        <Eyebrow index="04">Paleta</Eyebrow>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PALETTE.map((c) => (
            <div
              key={c.token}
              className="overflow-hidden rounded-md border border-line"
            >
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-3">
                <p className="text-card-title">
                  {c.name}
                  {c.brand ? (
                    <span className="ml-2 font-mono text-[10px] tracking-[0.14em] text-cyan-ink-strong uppercase">
                      marca
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 font-mono text-data text-fg-muted">{c.hex}</p>
                <p className="font-mono text-[11px] text-fg-muted">{c.token}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Botones en claro y en oscuro ---------- */}
      <Section tone="light" spacing="sm">
        <Eyebrow index="05">Botones sobre claro</Eyebrow>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="navy" size="lg" iconRight="->">
            Solicitar diagnostico
          </Button>
          <Button variant="cyan">Ver soluciones</Button>
          <Button variant="outline">Hablar con un especialista</Button>
          <Button variant="ghost">Ver mas</Button>
        </div>
      </Section>

      <Section tone="navy" spacing="sm" arc={{ placement: "edge" }}>
        <Eyebrow index="06">Botones sobre oscuro</Eyebrow>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="navy" size="lg" iconRight="->">
            Solicitar diagnostico
          </Button>
          <Button variant="cyan">Ver soluciones</Button>
          <Button variant="outline">Hablar con un especialista</Button>
          <Button variant="ghost">Ver mas</Button>
        </div>
      </Section>

      {/* ---------- Tonos de seccion ---------- */}
      <Section tone="light" spacing="sm">
        <Eyebrow index="07">Tonos de seccion</Eyebrow>
      </Section>
      {TONES.map((t) => (
        <Section key={t.label} tone={t.tone} spacing="sm">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-mono text-eyebrow uppercase tracking-[0.18em]">
              {t.label}
            </p>
            <Eyebrow>Etiqueta de seccion</Eyebrow>
          </div>
          <p className="mt-4 max-w-[46ch] text-body">
            El tono decide el color del eyebrow, del boton y del anillo de foco
            sin pasar ni una prop.
          </p>
        </Section>
      ))}

      {/* ---------- Arco de marca ---------- */}
      <Section tone="light" spacing="base">
        <Eyebrow index="08">Arco de marca</Eyebrow>
        <p className="mt-5 max-w-[46ch] text-body text-fg-muted">
          Tres usos, y solo tres. En la web real, la variante edge se dibuja con
          el progreso de scroll y hace de barra de lectura.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="relative h-64 overflow-hidden rounded-md border border-line">
            <BrandArc
              placement="edge"
              className="inset-y-0 right-0 h-full w-24"
            />
            <p className="absolute bottom-3 left-3 font-mono text-data text-fg-muted">
              edge
            </p>
          </div>
          <div className="relative h-64 overflow-hidden rounded-md border border-line">
            <BrandArc
              placement="seam"
              className="top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2"
            />
            <p className="absolute bottom-3 left-3 font-mono text-data text-fg-muted">
              seam
            </p>
          </div>
          <div className="relative h-64 overflow-hidden rounded-md border border-line">
            <BrandArc
              placement="focus"
              weight={3}
              className="top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2"
            />
            <p className="absolute bottom-3 left-3 font-mono text-data text-fg-muted">
              focus
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- D-crop y escudo ---------- */}
      <Section tone="warm" spacing="base">
        <Eyebrow index="09">D-crop y escudo</Eyebrow>
        <p className="mt-5 max-w-[46ch] text-body text-fg-muted">
          Ninguna imagen es un rectangulo. El lado plano da al borde o al texto;
          el lado curvo abre hacia el contenido.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="d-crop-r bg-brand-gradient h-56" />
          <div className="d-crop-l bg-brand-gradient h-56" />
          <div className="rounded-shield h-56 bg-navy" />
        </div>
      </Section>

      <Section tone="ink" spacing="sm">
        <Container>
          <p className="font-mono text-data text-fg-inverse-muted">
            Ruta interna &middot; noindex &middot; no se enlaza desde la web
            pública
          </p>
        </Container>
      </Section>
    </main>
  );
}
