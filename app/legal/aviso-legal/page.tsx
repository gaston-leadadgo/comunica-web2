import type { Metadata } from "next";

import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal/aviso-legal" },
};

/**
 * PENDIENTE DEL CLIENTE: texto legal definitivo.
 *
 * Va `noindex` a proposito mientras sea un esqueleto. Publicar e indexar un aviso
 * legal incompleto es peor que no tenerlo: da apariencia de cumplimiento donde no
 * lo hay. El NAP sale del manual de marca, que es el dato fiable que si tenemos.
 */
export default function AvisoLegalPage() {
  return (
    <>
      <h1>Aviso legal</h1>

      <p>
        <strong>Pendiente de redacción definitiva.</strong> Esta página está
        preparada para recibir el texto legal que facilite {site.name}. Hasta
        entonces no se indexa en buscadores.
      </p>

      <h2>Titular del sitio</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.postalCode} {site.address.city}, {site.address.country}
        <br />
        Teléfono: {site.phone.display}
        <br />
        Correo: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Datos que faltan por confirmar</h2>
      <ul>
        <li>CIF y datos de inscripción en el Registro Mercantil.</li>
        <li>Número de operador registrado ante la CNMC.</li>
        <li>Correo corporativo definitivo para comunicaciones legales.</li>
        <li>Condiciones de uso, propiedad intelectual y ley aplicable.</li>
      </ul>
    </>
  );
}
