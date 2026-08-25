import Link from "next/link";

import { BrandArc } from "@/components/brand/brand-arc";
import { LinkedInGlyph } from "@/components/brand/linkedin-glyph";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/section";
import { footer } from "@/content/nav";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-tone="dark"
      className="relative isolate overflow-hidden bg-navy text-fg-inverse"
    >
      <BrandArc
        placement="edge"
        tone="white"
        opacity={0.2}
        className="inset-y-0 right-0 h-full w-[clamp(70px,12vw,180px)]"
      />

      <Container width="wide" className="relative py-section-sm">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          <div>
            <Logo variant="negativo" height={26} decorative />
            <p className="measure-body mt-7 text-body-sm text-fg-inverse-muted">
              {footer.tagline}
            </p>

            <ul className="mt-8 flex flex-col gap-2.5">
              {footer.facts.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 font-mono text-data text-white"
                >
                  <Icon name="check" size={14} className="shrink-0 text-cyan" />
                  <span data-tabular>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={footer.navTitle}>
            <h2 className="font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
              {footer.navTitle}
            </h2>
            {/* `gap-1` + `py-1.5` en cada enlace en lugar de `gap-3` seco: la diana
                pasa de 20px a 28px de alto sin cambiar el ritmo visual. La minima de
                WCAG 2.5.8 son 24px. */}
            <ul className="mt-5 flex flex-col gap-1">
              {footer.nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1.5 text-body-sm text-fg-inverse-muted transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-eyebrow tracking-[0.2em] text-cyan uppercase">
              {footer.partnersTitle}
            </h2>

            <div className="mt-6 rounded-shield border border-line-dark bg-white/[0.05] p-5">
              <p className="text-body-sm text-white">{footer.partnerPrompt}</p>
              <Link
                href={footer.partnerLink.href}
                className="mt-3 inline-flex items-center gap-2 py-1 text-body-sm font-semibold text-cyan-soft transition-colors hover:text-white"
              >
                <Icon name="shield-check" size={16} />
                {footer.partnerLink.label}
              </Link>
            </div>

            <Link
              href={footer.invoiceLink.href}
              className="mt-5 inline-flex items-start gap-2.5 py-1 text-body-sm text-fg-inverse-muted transition-colors hover:text-white"
            >
              <Icon name="file-text" size={16} className="mt-0.5 shrink-0 text-cyan" />
              {footer.invoiceLink.label}
            </Link>

            <address className="mt-8 flex flex-col gap-3 text-body-sm not-italic">
              <span className="flex items-start gap-3">
                <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-cyan" />
                <span className="text-fg-inverse-muted">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city},{" "}
                  {site.address.country}
                </span>
              </span>
              <a
                href={site.phone.href}
                className="flex items-center gap-3 py-1 transition-colors hover:text-cyan-soft"
              >
                <Icon name="phone" size={16} className="shrink-0 text-cyan" />
                <span data-tabular className="font-mono text-data">
                  {site.phone.international}
                </span>
              </a>
              <a
                href={site.social.linkedin.href}
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-3 py-1 text-fg-inverse-muted transition-colors hover:text-white"
              >
                <LinkedInGlyph size={15} className="shrink-0 text-cyan" />
                LinkedIn
                <Icon name="external-link" size={12} />
              </a>
            </address>
          </div>
        </div>

        {/* El lema cierra el footer a todo el ancho */}
        <p className="mt-16 border-t border-line-dark pt-10 text-center text-display-3 text-cyan">
          {footer.motto}
        </p>

        <div className="mt-10 flex flex-col gap-4 text-body-sm text-fg-inverse-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footer.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block py-1.5 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
