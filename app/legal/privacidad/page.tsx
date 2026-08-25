import type { Metadata } from "next";

import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal/privacidad" },
};

/**
 * PENDIENTE DEL CLIENTE: texto legal definitivo.
 *
 * Lo que si esta descrito aqui es el tratamiento que el codigo hace HOY, porque
 * eso lo sabemos con certeza y es lo que hay que declarar. Ver
 * `app/contacto/actions.ts`.
 */
export default function PrivacidadPage() {
  return (
    <>
      <h1>Política de privacidad</h1>

      <p>
        <strong>Pendiente de redacción definitiva.</strong> Debe redactarla el
        responsable legal de {site.name}. Mientras tanto, esto es lo que el
        formulario de la web hace realmente con los datos.
      </p>

      <h2>Qué datos se recogen</h2>
      <ul>
        <li>Nombre y apellidos, email, teléfono.</li>
        <li>Hotel, cadena o empresa, y su dimensión aproximada.</li>
        <li>El mensaje que escribas.</li>
      </ul>

      <h2>Para qué</h2>
      <p>
        Únicamente para responder a la consulta que envías. La base legal es tu
        consentimiento, que se solicita de forma expresa mediante la casilla del
        formulario.
      </p>

      <h2>Cuánto tiempo y con quién</h2>
      <p>
        Pendiente de definir el plazo de conservación y el destino de los leads
        (correo, CRM o ambos). No se ceden datos a terceros ni se realizan envíos
        comerciales sin permiso explícito.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación, supresión, limitación, portabilidad
        y oposición escribiendo a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
