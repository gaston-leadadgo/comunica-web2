import { routes } from "./site";
import type { Cta } from "./schema";

/**
 * Los cuatro perfiles de hotel. Son el eje de toda la web: aparecen resumidos en
 * la home y desarrollados en Soluciones.
 *
 * Copy literal de la demo: HomeSection.tsx (tarjetas) y SolutionsSection.tsx
 * (fichas completas con servicios incluidos y opcionales), con la ortografia
 * corregida.
 */

export type HotelProfile = {
  id: "conectado" | "consolidado" | "gestionado" | "especializado";
  /** Nombre del perfil. */
  name: string;
  /**
   * Rango de tamano, SIEMPRE en numero de propiedades.
   *
   * Antes el primer perfil se medía en habitaciones ("Una propiedad · 20-120
   * habitaciones") y los otros tres en propiedades. Puestos uno debajo de otro
   * en la lista de pestañas, "20-120" y "2-10" parecian la misma magnitud y la
   * escala se leia al reves. La unidad se unifica: una sola magnitud para los
   * cuatro perfiles. El detalle de habitaciones, cuando aporta, vive en el
   * cuerpo de la ficha, no en la insignia.
   */
  size: string;
  /** A quien va dirigido. */
  audience: string;
  /** Titular de la ficha en Soluciones. */
  headline: string;
  /** Parrafo de dolor, en la tarjeta de la home. */
  pain: string;
  /** Que hace Comunica, en la tarjeta de la home. */
  answer: string;
  /** Parrafos largos de la ficha de Soluciones. */
  body: string[];
  /** Servicios incluidos: titulo + detalle. */
  includes: { title: string; detail: string }[];
  /** Anadidos opcionales. */
  optional?: string[];
  /** Frase de cierre de la ficha. */
  closing: string;
  /** CTA propio de cada perfil. */
  cta: Cta;
};

export const hotelProfiles = [
  {
    id: "conectado",
    name: "Hotel Conectado",
    size: "1 propiedad",
    audience: "Para hoteles independientes",
    headline: "Lo esencial bien resuelto",
    pain: "Tienes un hotel que gestionar. No necesitas convertirte también en experto en telecomunicaciones.",
    answer:
      "Centralizamos las comunicaciones esenciales de tu establecimiento para que conectividad, telefonía y WiFi funcionen bajo una misma gestión.",
    body: [
      "Tienes suficientes cosas de las que ocuparte. Que Internet funcione, que el WiFi llegue donde tiene que llegar o que la telefonía esté operativa no debería requerir tu atención constante.",
      "Hotel Conectado reúne las comunicaciones esenciales de tu establecimiento bajo una misma gestión.",
    ],
    includes: [
      {
        title: "Centralita virtual",
        detail: "Comunicaciones del hotel gestionadas desde una solución flexible.",
      },
      {
        title: "Internet con multicobertura y respaldo automático",
        detail: "Para reducir la dependencia de una única conexión.",
      },
      {
        title: "WiFi gestionado",
        detail:
          "Con separación entre la red utilizada por empleados y la destinada a huéspedes.",
      },
      {
        title: "Soporte técnico",
        detail: "Para ayudarte cuando lo necesites.",
      },
    ],
    optional: [
      "Portal cautivo personalizado con la marca del hotel.",
      "iAndrea para reforzar la atención telefónica cuando aumenta la demanda o el equipo no puede responder.",
    ],
    closing: "El objetivo es sencillo: que funcione sin que tengas que gestionarlo todo.",
    cta: {
      label: "Quiero saber si encaja con mi hotel",
      href: `${routes.contacto}?intent=hotel_conectado`,
    },
  },
  {
    id: "consolidado",
    name: "Hotel Consolidado",
    size: "2-10 propiedades",
    audience: "Para pequeñas cadenas",
    headline: "Varias propiedades. Una sola forma de gestionarlas",
    pain: "Más hoteles no deberían significar más contratos, más facturas y más proveedores a los que perseguir cuando algo falla.",
    answer:
      "Centralizamos las telecomunicaciones de todas tus propiedades para simplificar la gestión del grupo.",
    body: [
      "Cada nueva propiedad puede traer consigo otro proveedor, otro contrato, otra factura y otra forma de trabajar. Hasta que alguien decide centralizar.",
      "Hotel Consolidado permite gestionar las telecomunicaciones del grupo como una única estructura.",
    ],
    includes: [
      {
        title: "Centralita premium multi-sede",
        detail:
          "Extensiones compartidas, colas de espera, grabación y gestión entre propiedades.",
      },
      {
        title: "Conectividad gestionada",
        detail: "Con visión centralizada del tráfico del grupo.",
      },
      {
        title: "WiFi y portal cautivo por propiedad",
        detail:
          "Una experiencia adaptada a cada establecimiento sin perder el control del conjunto.",
      },
      {
        title: "Reporting consolidado y soporte dedicado",
        detail: "Más visibilidad y conocimiento del conjunto de establecimientos.",
      },
    ],
    optional: ["IPTV, movilidad corporativa e iAndrea."],
    closing:
      "Porque gestionar cinco hoteles no debería significar gestionar cinco veces la tecnología.",
    cta: {
      label: "Quiero centralizar mi cadena",
      href: `${routes.contacto}?intent=hotel_consolidado`,
    },
  },
  {
    id: "gestionado",
    name: "Hotel Gestionado",
    size: "10-50 propiedades",
    audience: "Para cadenas en crecimiento",
    headline: "Una cadena. Un mismo estándar tecnológico",
    pain: "Cuando una cadena crece, la tecnología también tiene que hacerlo.",
    answer:
      "Homogeneizamos comunicaciones, conectividad y experiencia digital entre propiedades y las integramos con los sistemas del hotel.",
    body: [
      "El huésped reconoce tu marca independientemente del hotel en el que se aloje. Tu tecnología también debería responder a un mismo estándar.",
      "Hotel Gestionado ayuda a homogeneizar las comunicaciones y la experiencia tecnológica entre establecimientos, integrándolas con los sistemas del hotel.",
    ],
    includes: [
      {
        title: "Comunicaciones multi-sede",
        detail:
          "Centralita premium, SIP Trunk e integración con herramientas corporativas como Teams.",
      },
      {
        title: "Conectividad de alta capacidad",
        detail: "Fibra dedicada FTTO y sistema de respaldo 5G.",
      },
      {
        title: "WiFi integrado con los sistemas del hotel",
        detail:
          "Para conectar la experiencia del huésped con la operativa del establecimiento.",
      },
      {
        title: "IPTV gestionada y soporte 24/7",
        detail:
          "Una capa más de comunicación en habitación con interlocutor dedicado.",
      },
    ],
    closing: "Menos diferencias entre hoteles. Más control sobre el conjunto.",
    cta: {
      label: "Habla con un especialista",
      href: `${routes.contacto}?intent=hotel_gestionado`,
    },
  },
  {
    id: "especializado",
    name: "Proyecto Especializado",
    size: "50+ propiedades",
    audience: "Para grandes cadenas",
    headline: "No hace falta sustituir lo que funciona para resolver lo que falta",
    pain: "Quizá no necesites cambiar tu infraestructura. Quizá necesites resolver únicamente aquello que tu proveedor habitual no puede cubrir. Entramos ahí.",
    answer:
      "Diseñamos e integramos soluciones tecnológicas específicas dentro de la arquitectura existente.",
    body: [
      "Puede que ya trabajes con un gran operador. Puede que tengas un equipo IT propio y una infraestructura estandarizada. Pero incluso en ese escenario aparecen proyectos o necesidades que requieren una capacidad muy específica.",
      "Comunica puede incorporarse como partner tecnológico para resolver esa pieza concreta.",
    ],
    includes: [
      { title: "SIP Trunk para Contact Center", detail: "" },
      { title: "Soluciones de voz", detail: "" },
      { title: "iAndrea personalizada", detail: "" },
      { title: "IPTV e integraciones específicas", detail: "" },
    ],
    closing:
      "Nos integramos donde podemos aportar valor. Sin obligarte a sustituir lo que ya funciona.",
    cta: {
      label: "Cuéntanos tu proyecto",
      href: `${routes.contacto}?intent=proyecto_especializado`,
    },
  },
] satisfies readonly HotelProfile[];

/**
 * Las siete capacidades con las que se construye cada solucion. No son un
 * catalogo de productos: son las piezas que se combinan segun el perfil.
 */
export const capabilities = [
  {
    id: "conectividad",
    title: "Conectividad",
    description:
      "Internet de alta capacidad, multicobertura y sistemas de respaldo adaptados a las necesidades de cada establecimiento.",
    icon: "radio",
  },
  {
    id: "voz",
    title: "Voz y centralita",
    description:
      "Centralitas virtuales, soluciones multi-sede, SIP Trunk, numeración, colas y comunicaciones adaptadas a la operativa hotelera.",
    icon: "phone-call",
  },
  {
    id: "wifi",
    title: "WiFi",
    description:
      "Redes gestionadas para empleados y huéspedes, cobertura, segmentación y portales cautivos.",
    icon: "wifi",
  },
  {
    id: "iptv",
    title: "IPTV",
    description:
      "Televisión e información del hotel integradas en la experiencia de la habitación.",
    icon: "tv",
  },
  {
    id: "integraciones",
    title: "Integraciones",
    description:
      "Conexión entre comunicaciones y sistemas hoteleros para reducir tareas manuales y mejorar la operación.",
    icon: "workflow",
  },
  {
    id: "iandrea",
    title: "iAndrea",
    description: "Inteligencia artificial aplicada a la atención telefónica del hotel.",
    icon: "sparkles",
  },
  {
    id: "soporte",
    title: "Soporte",
    description:
      "Personas que conocen la instalación y entienden el contexto en el que se produce cada incidencia.",
    icon: "headphones",
  },
] as const;
