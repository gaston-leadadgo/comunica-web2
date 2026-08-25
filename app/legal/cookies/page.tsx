import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal/cookies" },
};

/**
 * PENDIENTE DEL CLIENTE: decidir la analitica.
 *
 * Hoy la web NO instala ninguna cookie: no hay analitica, ni pixel, ni embebidos
 * de terceros. Eso significa que tampoco necesita banner de consentimiento, y es
 * la razon por la que se recomienda una analitica sin cookies (Plausible, Umami)
 * frente a GA4: un banner sobre el hero destruye la primera impresion y la metrica
 * de LCP.
 */
export default function CookiesPage() {
  return (
    <>
      <h1>Política de cookies</h1>

      <p>
        <strong>Esta web no utiliza cookies.</strong> No hay analítica, ni píxeles
        de seguimiento, ni contenido incrustado de terceros, así que no se almacena
        ninguna información en tu navegador y no hace falta pedirte consentimiento.
      </p>

      <h2>Si en el futuro se añade analítica</h2>
      <p>
        La recomendación técnica es usar una herramienta sin cookies. Si finalmente
        se instala Google Analytics 4, será obligatorio un banner con Consent Mode
        v2 y habrá que actualizar esta página antes de publicarlo.
      </p>
    </>
  );
}
