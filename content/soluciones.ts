import { routes } from "./site";
import type { Cta } from "./schema";

/**
 * Copy de Soluciones. Transcripcion literal de la demo aprobada
 * (Copys/src/components/SolutionsSection.tsx), con la ortografia corregida.
 *
 * Las cuatro fichas de perfil y las siete capacidades NO estan aqui: viven en
 * `content/perfiles.ts`, porque la home tambien las usa. Este fichero solo tiene
 * lo que es exclusivo de la pagina: cabecera, el bloque largo de iAndrea y el
 * cierre.
 */
export const soluciones = {
  hero: {
    eyebrow: "Soluciones para hoteles",
    titleLine1: "No te ofrecemos un catálogo.",
    titleLine2: "Construimos la solución alrededor de tu hotel",
    body: [
      "Un establecimiento independiente no tiene los mismos problemas que una cadena de veinte propiedades.",
      "Por eso combinamos conectividad, voz, WiFi, IPTV, inteligencia artificial e integraciones según tu tamaño, tu infraestructura y tu forma de operar.",
    ],
    highlight:
      "Primero entendemos qué necesitas. Después decidimos qué tecnología tiene sentido",
    cta: {
      label: "Habla con un especialista hotelero",
      href: routes.contacto,
    } satisfies Cta,
  },

  /** Etiquetas de la ficha de perfil, comunes a los cuatro paneles. */
  profileLabels: {
    tablistLabel: "Perfiles de hotel",
    includes: "Servicios incluidos:",
    optional: "Puedes añadir:",
    specific: "Soluciones específicas:",
  },

  capabilities: {
    title: "Las capacidades con las que construimos cada solución",
  },

  /** El bloque largo de iAndrea, exclusivo de esta pagina. */
  iandrea: {
    title: "iAndrea",
    subtitle:
      "Tu solución cuando el hotel recibe más llamadas de las que tu equipo puede atender",
    /** Las cuatro llamadas simultaneas. Se leen en cascada. */
    calls: [
      "Un huésped llama para preguntar por un servicio.",
      "Otro quiere hacer una reserva.",
      "Otro necesita información.",
      "Otro llama mientras recepción está atendiendo a quien acaba de llegar.",
    ],
    problem:
      "El problema no es que el teléfono suene. El problema es lo que ocurre cuando nadie puede responder.",
    definition: [
      "iAndrea es el agente virtual de voz con inteligencia artificial de Comunica.",
      "Puede atender llamadas entrantes y salientes, conversar con el cliente y realizar tareas durante la conversación.",
    ],
    features: [
      {
        title: "Atiende 24/7",
        description:
          "La atención telefónica puede continuar cuando el equipo no está disponible.",
        icon: "clock",
      },
      {
        title: "Gestiona reservas",
        description:
          "Puede atender solicitudes y conectarse con sistemas externos para realizar acciones durante la conversación.",
        icon: "calendar-range",
      },
      {
        title: "Responde preguntas frecuentes",
        description:
          "Horarios, servicios, información del establecimiento y otras consultas repetitivas pueden resolverse sin interrumpir al equipo.",
        icon: "help-circle",
      },
      {
        title: "Atiende varias llamadas a la vez",
        description:
          "La capacidad de atención deja de depender de que haya una persona disponible justo en ese momento.",
        icon: "layers",
      },
      {
        title: "Se configura en más de 15 idiomas",
        description:
          "Una ventaja especialmente relevante para hoteles con huéspedes internacionales.",
        icon: "globe",
      },
      {
        title: "Recoge y cualifica información",
        description:
          "Puede obtener datos durante la conversación, clasificar oportunidades y registrar información para su seguimiento.",
        icon: "database",
      },
      {
        title: "Deriva cuando hace falta una persona",
        description:
          "Automatiza aquello que puede resolverse de forma sencilla y pasa la conversación al equipo cuando necesita intervención humana.",
        icon: "split",
      },
      {
        title: "Se integra con tus sistemas",
        description:
          "Puede conectarse con CRM, software de reservas, ERP y centralitas IP para consultar información o realizar acciones durante la conversación.",
        icon: "workflow",
      },
    ],
    closing: [
      "La IA no debería darte más trabajo. Añadir una herramienta más que tu equipo tenga que aprender, alimentar y vigilar no resuelve demasiado.",
      "Por eso el valor de iAndrea no está simplemente en utilizar inteligencia artificial. Está en quitar tareas repetitivas de encima de las personas para que puedan dedicar su tiempo a aquellas conversaciones y situaciones en las que sí hacen falta.",
    ],
    motto: "Automatiza lo repetitivo. Mantén a las personas donde aportan valor.",
    cta: {
      label: "Quiero conocer iAndrea",
      href: `${routes.contacto}?intent=iandrea`,
    } satisfies Cta,
  },

  /**
   * Simulador interactivo de iAndrea.
   *
   * Adaptado de la version de Marcos (`comunica-version-marcos`,
   * `src/components/AndreaVoiceDemo.tsx`), que es de donde viene la idea y la
   * estructura de la conversacion.
   *
   * DOS CAMBIOS DE FONDO respecto a aquel original, los dos deliberados:
   *
   * 1. Los establecimientos son FICTICIOS. El original usaba "Asador Guria",
   *    "Hotel Plaza Condal" y "Clinica Medico Dental Sanitas", ademas de citar
   *    Mapfre, Adeslas, Sanitas, DKV y Asisa por su nombre. Son marcas de
   *    terceros y no hay autorizacion para publicarlas (§18.2 del plan). Aqui se
   *    sustituyen por nombres inventados y por "las principales mutuas".
   * 2. Se retira el escenario de clinica. Esta web posiciona a Comunica como
   *    especialista en hoteles y nada mas; un caso de clinica dental en la
   *    pagina de Soluciones contradice el posicionamiento entero. Quedan los dos
   *    escenarios hoteleros, que es donde el simulador demuestra lo que vende.
   */
  demo: {
    eyebrow: "Pruébalo",
    title: "Escucha cómo responde iAndrea",
    lead: "Elige un escenario y una pregunta. Verás la conversación tal y como la resolvería en tu hotel, sin pasar por recepción.",
    disclaimer:
      "Simulación con respuestas guionizadas. En producción, iAndrea consulta tus sistemas reales.",
    statusIdle: "Canal listo para simular",
    statusThinking: "iAndrea está pensando…",
    statusLive: "Llamada conectada",
    optionsLabel: "Elige qué preguntarle:",
    resetLabel: "Reiniciar la llamada",
    scenarioLabel: "Escenario",
    footerNote:
      "Se integra con tu centralita actual. La puesta en marcha se mide en días, no en meses.",
    scenarios: [
      {
        id: "recepcion",
        name: "Recepción del hotel",
        icon: "hotel",
        subtitle: "Integrada con el PMS",
        description:
          "iAndrea atiende al huésped alojado: horarios, servicios y peticiones sencillas que hoy interrumpen a recepción.",
        greeting:
          "Buenos días, ha llamado al Hotel Miramar. Soy iAndrea, la asistente de voz del hotel. Veo que llama desde la habitación 304. ¿En qué puedo ayudarle?",
        options: [
          {
            label: "Pedir salida tardía",
            question:
              "Hola, ¿sería posible retrasar unas horas el check-out de la habitación 304?",
            answer:
              "Déjeme comprobarlo en el sistema del hotel. Con la ocupación de hoy puedo confirmarle el check-out hasta las 14:00 sin coste. Lo dejo anotado en su reserva y aviso a recepción, así no tendrá que repetirlo al bajar.",
          },
          {
            label: "Preguntar por el WiFi",
            question: "¿Cuál es la clave del WiFi? ¿Tiene algún coste?",
            answer:
              "El WiFi es gratuito para huéspedes. La red se llama Miramar_Guest y no necesita contraseña: al conectarse se abre una página donde solo tiene que indicar su número de habitación y su apellido.",
          },
          {
            label: "Reservar spa y parking",
            question:
              "Me gustaría una plaza de parking y una sesión de spa para las seis de la tarde.",
            answer:
              "Consulto la agenda. Tengo libre el circuito termal a las 18:30 y queda plaza en el parking cubierto. ¿Le cargo ambos servicios a la cuenta de la habitación?",
          },
        ],
      },
      {
        id: "reservas",
        name: "Llamada de reserva",
        icon: "calendar-range",
        subtitle: "En hora punta",
        description:
          "La llamada que hoy se pierde porque recepción está atendiendo a alguien delante. iAndrea la coge y la deja cerrada.",
        greeting:
          "Hotel Miramar, le atiende iAndrea. ¿Desea consultar disponibilidad, hacer una reserva o que le pase con recepción?",
        options: [
          {
            label: "Consultar disponibilidad",
            question:
              "Buenas, ¿tenéis una habitación doble libre para el próximo fin de semana?",
            answer:
              "Sí, para el viernes y el sábado me quedan habitaciones dobles con vistas exteriores. La tarifa incluye desayuno y cancelación gratuita hasta 48 horas antes. ¿Quiere que se la reserve?",
          },
          {
            label: "Preguntar por el desayuno",
            question: "¿A qué hora servís el desayuno y está incluido?",
            answer:
              "El desayuno se sirve de 7:00 a 10:30, y hasta las 11:00 los fines de semana. Está incluido en su tarifa. Si necesita salir antes, podemos prepararle un desayuno para llevar avisando la noche anterior.",
          },
          {
            label: "Hablar con una persona",
            question:
              "Quiero organizar un grupo de veinte personas, prefiero hablarlo con alguien.",
            answer:
              "Por supuesto. Para grupos a partir de diez habitaciones tenemos condiciones concertadas. Le paso ahora mismo con el equipo de reservas y les adelanto que llama por un grupo de veinte, para que no tenga que explicarlo de nuevo.",
          },
        ],
      },
    ],
  },

  /**
   * Extension Dinamica, version de Soluciones.
   *
   * NO es la misma pieza que la de la home, y por eso vive aqui y no se reutiliza
   * `home.extension`. En la home el bloque tiene que despertar interes en cinco
   * lineas, asi que arranca por el contexto ("el telefono de la habitacion lleva
   * decadas...") y los beneficios van como etiquetas sueltas. Aqui el lector ya
   * ha decidido que le interesa el producto: se entra directamente por el
   * mecanismo y cada beneficio se argumenta.
   *
   * Copy literal del cliente.
   */
  extension: {
    eyebrow: "Innovación en telefonía hotelera",
    title: "Extensión Dinámica",
    subtitle: "La extensión de la habitación, en el móvil del huésped",
    body: [
      "Con la Extensión Dinámica de Comunica, el huésped escanea un código QR y puede utilizar su propio móvil como extensión de la habitación durante su estancia.",
      "Una forma más flexible de plantear la telefonía hotelera, especialmente interesante en reformas, ampliaciones y nuevos proyectos.",
    ],
    /**
     * Beneficios argumentados. La home usa `benefits`, una lista de etiquetas
     * cortas; esta version usa `detailedBenefits`, y `ExtensionBlock` cambia de
     * pastillas a celdas con titulo y explicacion cuando este campo esta
     * presente.
     */
    detailedBenefits: [
      {
        title: "Menos hardware. Menos mantenimiento.",
        description:
          "Reduce la dependencia de terminales físicos, cableado específico y equipos que instalar, reparar o sustituir.",
      },
      {
        title: "Una experiencia más mobile-first.",
        description:
          "El huésped utiliza el dispositivo que ya conoce y lleva consigo, sin necesidad de depender del teléfono de sobremesa de la habitación.",
      },
      {
        title: "Integrada en el ecosistema del hotel.",
        description:
          "Puede formar parte de una arquitectura conjunta con WiFi, voz, iAndrea e integraciones, bajo un mismo proveedor.",
      },
    ],
    closing:
      "Menos infraestructura que gestionar. Más flexibilidad para comunicar.",
    cta: {
      label: "Quiero conocer la Extensión Dinámica",
      href: `${routes.contacto}?intent=extension`,
    } satisfies Cta,
  },

  closing: {
    title: "¿No sabes qué solución necesitas?",
    body: [
      "Es lo normal, no deberías tener que diseñarla tú. Nosotros nos encargamos de ello.",
      "Cuéntanos qué está ocurriendo y analizaremos contigo qué merece la pena mantener, qué puede mejorarse y qué solución tiene sentido.",
    ],
    cta: {
      label: "Habla con un especialista hotelero",
      href: routes.contacto,
    } satisfies Cta,
  },
} as const;
