import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import { BrandDefs } from "@/components/brand/brand-defs";
import { Footer } from "@/components/layout/footer";
import { MotionBoot } from "@/components/layout/motion-boot";
import { Header } from "@/components/layout/header";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";

import "./globals.css";

/**
 * Proxies web de las tipografias de marca (el manual usa fuentes comerciales):
 * - Space Grotesk sustituye a Martian B Thai y al Modeka Extended del logotipo:
 *   misma construccion semi-modular industrial. Tope 700, no tiene 800.
 * - Plus Jakarta Sans sustituye a Centuma: grotesca moderna de contraste suave.
 * - JetBrains Mono no esta en el manual. Es una extension deliberada: una web de
 *   operador necesita una voz "de datos" para que las cifras se lean como
 *   instrumentacion y no como decoracion.
 *
 * Se autoalojan con next/font, asi que no hay ninguna peticion a Google en
 * runtime y `size-adjust` evita el salto de layout al cargar.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.comunica.com"),
  // "y empresas" venia del posicionamiento anterior. La demo aprobada habla solo
  // a hoteles, y un titulo que promete dos publicos diluye el unico argumento
  // fuerte que tiene la marca frente a un operador generalista.
  title: {
    default: "Comunica | Tecnología y telecomunicaciones para hoteles",
    template: "%s | Comunica",
  },
  description:
    "Conectividad, voz, WiFi, IPTV e inteligencia artificial para hoteles, integradas y gestionadas por un equipo que entiende la operativa hotelera. 350 hoteles en 13 países.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Comunica",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior: Next 16 ya no anula `scroll-behavior: smooth` en
    // las transiciones de ruta. Sin este atributo, cada navegacion haria un
    // scroll suave y largo hasta arriba en vez de saltar, y pareceria un fallo.
    <html
      lang="es-ES"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body>
        <BrandDefs />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
        >
          Saltar al contenido principal
        </a>
        <Header />
        {children}
        <Footer />
        <StickyMobileCta />
        <MotionBoot />
      </body>
    </html>
  );
}
