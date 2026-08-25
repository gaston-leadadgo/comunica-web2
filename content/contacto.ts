import { site } from "./site";

/**
 * Copy de Contacto. Deriva del ContactModal de la demo aprobada, con dos cambios
 * de fondo:
 *
 * 1. Es una PAGINA, no un modal. Los CTA de toda la web ya llevan
 *    `?intent=...`, asi que la intencion viaja en la URL: el enlace se puede
 *    compartir y reenviar (un director de hotel reenvia la peticion a su
 *    financiero, que es un caso real en B2B), sobrevive a una recarga y funciona
 *    sin JavaScript. Un modal no hace ninguna de las tres cosas.
 * 2. Hay casilla de consentimiento. La demo solo tenia un parrafo informativo,
 *    que es insuficiente para captacion de leads bajo RGPD.
 */

/** Las intenciones que acepta la URL. El orden es el de las pildoras. */
export const CONTACT_INTENTS = [
  "general",
  "factura",
  "iandrea",
  "hotel_conectado",
  "hotel_consolidado",
  "hotel_gestionado",
  "proyecto_especializado",
  "extension",
  "partner_canal",
  "partner_service_provider",
  "partner_referral",
] as const;

export type ContactIntent = (typeof CONTACT_INTENTS)[number];

/** Titulo del formulario segun la intencion. Literal de la demo. */
export const INTENT_TITLE: Record<ContactIntent, string> = {
  general: "Cuéntanos qué necesitas resolver en tu hotel",
  factura: "Solicitud de revisión de factura tecnológica",
  iandrea: "Demostración e información de iAndrea",
  hotel_conectado: "Consulta: Hotel Conectado (independientes)",
  hotel_consolidado: "Consulta: Hotel Consolidado (pequeñas cadenas)",
  hotel_gestionado: "Consulta: Hotel Gestionado (cadenas en crecimiento)",
  proyecto_especializado: "Consulta: Proyecto Especializado (grandes cadenas)",
  extension: "Consulta: Extensión Dinámica",
  partner_canal: "Unirse al canal de partners de Comunica",
  partner_service_provider: "Solicitud de partner: Service Provider",
  partner_referral: "Solicitud de partner: Referral Partner",
};

/**
 * Las cinco pildoras visibles. Las intenciones que no estan aqui llegan por URL
 * desde una ficha concreta y se mapean a la pildora que les corresponde, para no
 * poner once botones en un selector.
 */
export const INTENT_PILLS = [
  { value: "general", label: "Consulta general" },
  { value: "factura", label: "Revisión de factura" },
  { value: "iandrea", label: "iAndrea (IA de voz)" },
  { value: "hotel_conectado", label: "Soluciones para mi hotel" },
  { value: "partner_canal", label: "Programa de partners" },
] as const satisfies readonly { value: ContactIntent; label: string }[];

/** A que pildora corresponde cada intencion que no tiene pildora propia. */
export const INTENT_PILL_OF: Record<ContactIntent, ContactIntent> = {
  general: "general",
  factura: "factura",
  iandrea: "iandrea",
  hotel_conectado: "hotel_conectado",
  hotel_consolidado: "hotel_conectado",
  hotel_gestionado: "hotel_conectado",
  proyecto_especializado: "hotel_conectado",
  extension: "general",
  partner_canal: "partner_canal",
  partner_service_provider: "partner_canal",
  partner_referral: "partner_canal",
};

export const contacto = {
  hero: {
    eyebrow: "Contacto",
    title: "Cuéntanos qué quieres resolver",
    lead: "No necesitas saber qué producto necesitas. Un especialista hotelero analizará tus datos y responderá sin compromiso.",
  },

  form: {
    intentLabel: "¿Qué tipo de consulta o solución deseas?",
    fields: {
      nombre: { label: "Nombre y apellidos", placeholder: "Ej. Carlos Mendoza" },
      email: { label: "Email corporativo", placeholder: "carlos@hotel.com" },
      telefono: { label: "Teléfono de contacto", placeholder: "+34 600 000 000" },
      empresa: {
        label: "Hotel / cadena / empresa",
        placeholder: "Ej. Hotel Marina Centro",
      },
      dimension: {
        label: "Número de habitaciones o propiedades",
        placeholder: "Ej. 65 habitaciones / 3 propiedades",
        hint: "Opcional. Nos ayuda a saber con quién estamos hablando.",
      },
      mensaje: {
        label: "¿Qué quieres resolver o mejorar en tu hotel?",
        placeholder:
          "Cuéntanos brevemente cuál es el principal problema o qué servicio deseas analizar",
      },
    },
    invoice: {
      label: "Adjuntar factura actual para revisión de costes",
      optional: "Opcional",
      hint: "Detectamos costes innecesarios, duplicidades y puntos de mejora.",
      accept: "PDF, JPG o PNG. Máximo 10 MB.",
      /**
       * La subida real necesita destino de almacenamiento y base legal para tratar
       * un documento de facturacion de un tercero. Hasta que el cliente lo defina,
       * el campo indica como enviarla.
       */
      pending: `Mientras habilitamos la subida, puedes enviárnosla por correo a ${site.email} indicando el nombre de tu establecimiento.`,
    },
    consent: {
      // Partido en tres porque en medio va un enlace real a la politica. Con la
      // frase entera habria que trocearla en el componente, y el copy dejaria de
      // ser editable sin tocar codigo.
      before: "He leído y acepto la",
      linkLabel: "política de privacidad",
      after:
        ", y autorizo el tratamiento de mis datos para recibir respuesta a esta consulta.",
      /** PENDIENTE: texto legal definitivo del cliente. */
      note: "Tratamiento confidencial. No cedemos tus datos a terceros ni te incluimos en ningún envío comercial sin tu permiso.",
    },
    submit: "Enviar consulta",
    submitting: "Enviando",
    requiredNote: "Los campos marcados con * son obligatorios.",
    errorSummary: "Revisa los campos marcados:",
  },

  success: {
    title: "Mensaje recibido",
    ticketLabel: "Referencia de tu solicitud",
    commitmentLabel: "Compromiso de respuesta Comunica",
    commitment:
      "Revisaremos lo que necesitas y un especialista de nuestro equipo se pondrá en contacto contigo a la brevedad.",
    again: "Enviar otra consulta",
  },

  aside: {
    title: "También puedes llamarnos",
    hoursLabel: "Horario de oficina",
    addressLabel: "Oficinas",
    /**
     * PENDIENTE: la web promete soporte 24/7 en el pack Hotel Gestionado y a la
     * vez horario L-V. Son cosas distintas y hay que decirlo asi.
     */
    supportNote:
      "El soporte 24/7 forma parte de los acuerdos con SLA ampliado. El horario de arriba es el de atención comercial.",
  },
} as const;
