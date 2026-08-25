import type { Metadata } from "next";

import { BrandArc } from "@/components/brand/brand-arc";
import { ContactForm } from "@/components/sections/contacto/form";
import { ContactoRevealWrap } from "@/components/sections/contacto/reveal-wrap";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import {
  CONTACT_INTENTS,
  contacto,
  type ContactIntent,
} from "@/content/contacto";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué quieres resolver en tu hotel. Un especialista hotelero revisa tus servicios, tu factura o tu instalación y responde sin compromiso.",
  // Las variantes con `?intent=` no deben duplicar: todas canonican a /contacto.
  alternates: { canonical: "/contacto" },
};

/**
 * Contacto.
 *
 * `searchParams` se valida en el servidor contra la lista de intenciones: un
 * `?intent=` inventado cae a "general" en lugar de romper el render. Es un
 * parametro que viaja en enlaces publicos, asi que se trata como entrada no
 * confiable.
 *
 * En Next 16 `searchParams` es una promesa y hay que esperarla.
 */
export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent: raw } = await searchParams;
  const intent: ContactIntent = (CONTACT_INTENTS as readonly string[]).includes(
    raw ?? "",
  )
    ? (raw as ContactIntent)
    : "general";

  return (
    <main
      id="main"
      className="relative isolate w-full max-w-full overflow-x-hidden bg-paper-warm pt-[calc(var(--header-h)+clamp(2.5rem,6vw,4rem))] pb-section"
    >
      <div aria-hidden="true" className="bg-radial-wash absolute inset-0 -z-10" />
      <BrandArc
        placement="edge"
        tone="gradient"
        weight={2}
        opacity={0.35}
        draw
        className="inset-y-0 right-0 -z-10 h-full w-[clamp(60px,10vw,160px)]"
      />

      <Container width="wide">
        <ContactoRevealWrap>
        <div data-reveal className="max-w-[46rem]">
          <p className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
            {contacto.hero.eyebrow}
          </p>
          <h1 className="mt-7 text-display-2 text-balance">
            {contacto.hero.title}
          </h1>
          <p className="measure-body mt-6 text-lead text-fg-muted">
            {contacto.hero.lead}
          </p>
        </div>

        <div
          data-reveal
          className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start"
        >
          <ContactForm intent={intent} />

          {/* Columna de datos: se queda fija mientras se rellena el formulario */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div className="rounded-shield bg-navy p-7 text-fg-inverse lg:p-8">
              <p className="text-display-3 text-white">{contacto.aside.title}</p>

              <a
                href={site.phone.href}
                className="mt-5 flex items-center gap-3 font-mono text-display-3 text-cyan"
                data-tabular
              >
                <Icon name="phone" size={20} className="shrink-0" />
                {site.phone.display}
              </a>

              <div className="mt-7 border-t border-white/12 pt-6">
                <p className="font-mono text-eyebrow tracking-[0.18em] text-cyan uppercase">
                  {contacto.aside.hoursLabel}
                </p>
                <p className="mt-2 text-body-sm text-fg-inverse-muted">
                  {site.hours.display}
                </p>
                <p className="mt-3 text-small text-fg-inverse-muted/80">
                  {contacto.aside.supportNote}
                </p>
              </div>

              <div className="mt-6 border-t border-white/12 pt-6">
                <p className="font-mono text-eyebrow tracking-[0.18em] text-cyan uppercase">
                  {contacto.aside.addressLabel}
                </p>
                <address className="mt-2 text-body-sm text-fg-inverse-muted not-italic">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                  <br />
                  {site.address.country}
                </address>
              </div>

              <div className="mt-6 border-t border-white/12 pt-6">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 py-1 text-body-sm text-cyan-soft"
                >
                  <Icon name="mail" size={16} className="shrink-0" />
                  {site.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
        </ContactoRevealWrap>
      </Container>
    </main>
  );
}
