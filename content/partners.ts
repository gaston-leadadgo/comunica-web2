import { routes } from "./site";
import type { Cta, IconName } from "./schema";

/**
 * Copy de Partners. Transcripcion literal de la demo aprobada
 * (Copys/src/components/PartnersSection.tsx), con la ortografia corregida.
 *
 * Diferencia respecto a la demo, deliberada: la demo abre un modal de login que
 * marca la sesion como valida con cualquier contrasena. Aqui no se publica un
 * formulario de acceso que no autentica: el bloque de portal explica que existe y
 * envia a contacto. Ver `portal.pending` mas abajo.
 */
export const partners = {
  hero: {
    eyebrow: "Partners Comunica",
    titleLine1: "Amplía lo que puedes ofrecer.",
    titleLine2: "Sin tener que construirlo todo tú",
    body: [
      "Tus clientes pueden pedirte proyectos que están fuera de tu catálogo o requieren una capacidad técnica que no tiene sentido desarrollar internamente.",
      "Eso no debería obligarte a decir que no.",
      "Comunica pone tecnología, capacidad técnica y soporte detrás de tu propuesta.",
    ],
    highlight:
      "Tú aportas la relación con el cliente. Nosotros te ayudamos a llegar más lejos.",
    cta: {
      label: "Quiero ser partner",
      href: `${routes.contacto}?intent=partner_canal`,
    } satisfies Cta,
    /**
     * CTA secundario para quien YA es partner. El hero solo hablaba a quien aun
     * no lo es, y un partner en activo que entra buscando material o soporte no
     * tenia ninguna puerta hasta el bloque de portal, muy abajo. Ancla a ese
     * bloque en lugar de a contacto: es donde esta la respuesta.
     */
    secondaryCta: {
      label: "Ya soy partner",
      href: "#portal",
    } satisfies Cta,
  },

  opportunity: {
    title: "Que una oportunidad no termine en otro proveedor",
    lead: "Tu cliente ya confía en ti. Pero te pide una solución que no puedes construir. Una integración más compleja. Una solución hotelera. IPTV. Comunicaciones. IA. O un proyecto que necesita más capacidad técnica de la que tienes disponible.",
    /** Las tres salidas posibles. La tercera es la buena. */
    options: [
      "Puedes rechazarlo.",
      "Puedes enviarlo a otra empresa.",
      "O puedes tener a Comunica detrás.",
    ],
  },

  models: {
    title: "Dos formas de trabajar juntos",
    items: [
      {
        id: "service-provider",
        name: "Service Provider",
        claim:
          "Tienes clientes y capacidad comercial. Quieres ampliar lo que puedes ofrecerles.",
        body: [
          "Para operadores regionales, distribuidores y empresas tecnológicas con cartera propia que quieren abordar soluciones que hoy no pueden desarrollar por sí mismos.",
          "Comunica aporta catálogo, soporte técnico y capacidad de preventa para ayudarte en los proyectos más complejos.",
          "La colaboración puede plantearse bajo marca Comunica o mediante fórmulas de marca blanca, según el acuerdo.",
        ],
        split: { yours: "Tú mantienes la relación.", ours: "Nosotros ampliamos tu capacidad." },
        featured: true,
        cta: {
          label: "Quiero ser Service Provider",
          href: `${routes.contacto}?intent=partner_service_provider`,
        } satisfies Cta,
      },
      {
        id: "referral",
        name: "Referral Partner",
        claim: "Tú detectas la oportunidad. Nosotros ayudamos a convertirla en proyecto.",
        body: [
          "Para agentes, comerciales independientes y pequeñas empresas que tienen relaciones de confianza con propietarios, hoteles o negocios, pero no cuentan con infraestructura técnica propia.",
          "No necesitas convertirte en especialista. Nos cuentas qué necesita el cliente y nuestro equipo se encarga de estudiar el proyecto, preparar la solución y aportar el soporte técnico necesario.",
        ],
        split: {
          yours: "Tú conoces al cliente.",
          ours: "Nosotros sabemos cómo resolver la parte tecnológica.",
        },
        featured: false,
        cta: {
          label: "Quiero ser Referral Partner",
          href: `${routes.contacto}?intent=partner_referral`,
        } satisfies Cta,
      },
    ],
  },

  benefits: {
    title: "Más negocio sin aumentar tu estructura",
    items: [
      {
        title: "Un catálogo más amplio",
        description: "Incorpora soluciones que sería complejo desarrollar por tu cuenta.",
        icon: "layers" as IconName,
      },
      {
        title: "Soporte técnico de preventa",
        description:
          "Cuando una oportunidad requiere conocimientos que no tienes internamente, los ponemos detrás de ti.",
        icon: "headphones" as IconName,
      },
      {
        title: "Capacidad de ejecución",
        description:
          "No tienes que construir una nueva estructura para poder abordar proyectos más grandes o especializados.",
        icon: "settings" as IconName,
      },
      {
        title: "Flexibilidad de marca",
        description:
          "Podemos estudiar modelos bajo marca Comunica o marca blanca según la colaboración.",
        icon: "award" as IconName,
      },
      {
        title: "Material comercial",
        description:
          "Argumentos y recursos que te ayudan a presentar las soluciones al cliente.",
        icon: "book-open" as IconName,
      },
      {
        title: "Una relación pensada para crecer",
        description:
          "Un modelo de canal en el que cada parte aporta aquello que sabe hacer mejor.",
        icon: "refresh-cw" as IconName,
      },
    ],
  },

  start: {
    title: "¿Cómo empezamos?",
    steps: [
      {
        number: "1",
        title: "Conocemos tu negocio",
        description: "Nos cuentas qué vendes, a qué tipo de clientes y en qué zonas trabajas.",
      },
      {
        number: "2",
        title: "Definimos la colaboración",
        description:
          "Valoramos qué modelo encaja mejor contigo y qué soluciones pueden complementar tu oferta.",
      },
      {
        number: "3",
        title: "Preparamos el soporte",
        description:
          "Definimos cómo trabajaremos la preventa, la propuesta y la ejecución de los proyectos.",
      },
      {
        number: "4",
        title: "Generamos negocio juntos",
        description: "Tú detectas oportunidades. Comunica te ayuda a resolverlas.",
      },
    ],
    cta: {
      label: "Quiero hablar sobre partners",
      href: `${routes.contacto}?intent=partner_canal`,
    } satisfies Cta,
  },

  reflection: {
    /** El primer parrafo lleva enfasis dentro, asi que va partido. */
    lead: {
      before: "Tú ya tienes algo que nosotros no podemos fabricar:",
      emphasis: "la confianza de tu cliente.",
    },
    body: "Nosotros tenemos tecnología, conocimiento y capacidad técnica que quizá tú no necesites construir.",
    highlight: "Si juntamos ambas cosas, podemos llegar más lejos.",
    cta: {
      label: "Quiero ser partner",
      href: `${routes.contacto}?intent=partner_canal`,
    } satisfies Cta,
  },

  portal: {
    prompt: "¿Ya eres partner de Comunica?",
    label: "Acceder al portal de partners",
    /**
     * PENDIENTE DEL CLIENTE: hace falta saber contra que se autentica. Hasta
     * entonces no se publica una caja de acceso, porque la de la demo valida
     * cualquier contrasena y eso es peor que no tenerla.
     */
    pending:
      "El acceso al portal se habilitará en cuanto esté conectado. Si ya trabajas con nosotros y necesitas material o soporte, escríbenos y te lo hacemos llegar.",
    cta: {
      label: "Escribir a mi contacto en Comunica",
      href: `${routes.contacto}?intent=partner_canal`,
    } satisfies Cta,
  },
} as const;
