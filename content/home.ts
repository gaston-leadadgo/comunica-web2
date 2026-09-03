import { routes } from "./site";
import type { Cta, IconName, ProcessStep, ValueItem } from "./schema";

/**
 * Copy de la home. Transcripcion literal de la demo aprobada
 * (web nueva/Copys/src/components/HomeSection.tsx), con la ortografia
 * corregida: tildes y ñ restituidas donde la extraccion original las habia
 * perdido.
 *
 * El posicionamiento cambia respecto al material anterior: aqui Comunica no es
 * un operador B2B generalista con una division hotelera, es una empresa
 * especializada en hoteles y nada mas. Todo el copy habla al hotelero.
 */
export const home = {
  hero: {
    /**
     * Sin eyebrow por decision de cliente: "Tecnologia hotelera, resuelta" era
     * la referencia explicita a tecnologia hotelera en la parte superior del
     * sitio que se pidio retirar. La frase no se pierde, sigue siendo el titular
     * de `value` mas abajo, que es donde la demo aprobada ya la usaba.
     */
    titleLine1: "Que la tecnología de tu hotel funcione,",
    titleLine2: "sin que tu equipo tenga que estar pendiente",
    lead: "Conectividad, voz, WiFi, IPTV e inteligencia artificial gestionadas por un único equipo especializado en hoteles, que conoce tu operativa y tu instalación",
    ctas: [
      { label: "Habla con un especialista hotelero", href: routes.contacto, variant: "navy" },
      { label: "Solicita una revisión de tu factura", href: `${routes.contacto}?intent=factura`, variant: "outline" },
    ] satisfies Cta[],
  },

  /** Banda de credibilidad. Va justo despues del hero, no dentro. */
  credibility: {
    claim: "350 hoteles · 13 países · Soporte con nombre propio",
    logosLabel: "Ya confían en Comunica",
    /**
     * PENDIENTE DE AUTORIZACION DEL CLIENTE: son marcas de terceros y
     * afirmaciones de cartera. No se publican sin confirmacion por escrito.
     */
    logos: [
      "Meliá Hotels & Resorts",
      "Barceló Hotel Group",
      "Iberostar Hotels",
      "NH Hotel Group",
      "Eurostars Hotel Company",
      "Riu Hotels & Resorts",
      "Palladium Hotel Group",
      "Paradores de Turismo",
      "Catalonia Hotels & Resorts",
      "H10 Hotels",
    ],
  },

  problem: {
    title: "Tu huésped no distingue entre tecnología y servicio",
    introLabel: "Solo sabe que:",
    /**
     * Los tres sintomas, con el icono con el que se representa cada uno en las
     * tarjetas. El texto es literal de la demo; el icono es presentacion.
     */
    symptoms: [
      { text: "El WiFi no funciona", icon: "wifi" },
      { text: "La conexión falla", icon: "activity" },
      {
        text: "Algo que debería ser fácil le está dando problemas",
        icon: "help-circle",
      },
    ] satisfies readonly { text: string; icon: IconName }[],
    /* El widget "¿Quien lo resuelve?" se retiro por peticion de cliente:
       repetia en forma de interfaz lo que el parrafo de `body` ya dice. */
    body: [
      "Y mientras tanto, alguien de tu equipo intenta averiguar cuál de los proveedores tiene que resolver el problema.",
    ],
    pullQuote:
      "La tecnología debería hacer más sencillo gestionar un hotel, no añadir un obstáculo nuevo.",
    afterQuote: "Por eso en Comunica no empezamos enseñándote un catálogo.",
    questionsLabel: "Empezamos preguntando:",
    questions: [
      "¿Qué está fallando?",
      "¿Qué te está haciendo perder tiempo?",
      "¿Qué estás pagando que quizá ya no necesitas?",
      "¿Qué podría funcionar mejor?",
    ],
    closing: "Y después buscamos la forma de resolverlo.",
  },

  value: {
    title: "Tecnología hotelera, resuelta",
    lead: "Comunica integra y gestiona las telecomunicaciones y soluciones tecnológicas que necesita un hotel",
    /** Etiqueta del listado. Era "Las piezas"; cliente pide "Soluciones". */
    capabilitiesLabel: "Soluciones",
    capabilitiesLine:
      "Conectividad. Voz. WiFi. IPTV. Integraciones. Inteligencia artificial. Soporte",
    /** Fragmento de `differenceIntro` que va resaltado. */
    differenceLabel: "nuestra diferencia",
    differenceIntro: "Pero nuestra diferencia no está en tener muchos servicios.",
    differenceHighlight:
      "Está en conseguir que tú tengas menos cosas de las que preocuparte.",
    pillars: [
      "Un equipo que entiende tu operativa.",
      "Un interlocutor que conoce tu instalación.",
      "Alguien que te ayuda a detectar qué mejorar.",
    ],
    motto: "Entendemos. Proponemos. Resolvemos.",
  },

  testimonials: {
    label: "Experiencias reales",
    /**
     * PENDIENTE DE AUTORIZACION: nombres, cargos y establecimientos.
     * Vienen de la demo y hay que confirmar que son citas reales y publicables.
     */
    items: [
      {
        quote:
          "Antes teníamos 4 proveedores distintos y cuando fallaba el WiFi nadie se hacía responsable. Con Comunica tenemos un único interlocutor que resuelve en minutos cualquier incidencia.",
        name: "Manuel Gómez",
        role: "Director General · Resort Costa Brava (180 hab.)",
        initials: "MG",
      },
      {
        quote:
          "iAndrea y la centralita en la nube nos han permitido atender el 100% de las llamadas en temporada alta sin saturar recepción. El huésped recibe respuesta inmediata en su idioma.",
        name: "Carmen Rivas",
        role: "Operations Manager · Hotel Boutique Madrid",
        initials: "CR",
      },
      {
        quote:
          "Modernizar la red y la telefonía de 6 hoteles con ellos fue impecable. Cero cortes en el servicio al cliente y un ahorro operativo tangible desde el primer mes.",
        name: "Javier Serrano",
        role: "Director IT · Cadena Hotelera Urbana",
        initials: "JS",
      },
    ],
  },

  calculator: {
    title: "¿Cuánto te cuesta hoy la complejidad de tus telecomunicaciones?",
    lead: "Cuando un hotel acumula operadores, contratos y servicios a lo largo de los años, es fácil acabar pagando por duplicidades, servicios que ya no se utilizan o soluciones que nunca se han revisado.",
    highlight: "Haz una primera estimación de cuánto podrías optimizar",
    roomsLabel: "N.º de habitaciones",
    roomsTicks: ["10 hab.", "150 hab.", "300+ hab."],
    spendLabel: "Gasto mensual actual en telecomunicaciones",
    spendHint: "Voz + conectividad + WiFi + TV",
    spendTicks: ["200 €", "4.000 €", "8.000+ €"],
    sliderHint:
      "Ajusta los deslizadores según la dimensión aproximada de tu establecimiento.",
    resultLabel: "Potencial de optimización estimado",
    perMonth: "/ mes",
    perYear: "/ año",
    disclaimer:
      "Estimación orientativa basada en la experiencia de Comunica en el sector hotelero",
    disclaimerDetail:
      "El ahorro real depende de los servicios contratados, proveedores, infraestructura y situación actual de cada hotel.",
    ctaTitle: "¿Quieres saber qué hay realmente detrás de este número?",
    ctaLead:
      "Revisamos contigo tus servicios y tu factura actual para detectar dónde puede existir margen de mejora",
    cta: {
      label: "Solicita una revisión de tu factura",
      href: `${routes.contacto}?intent=factura`,
    } satisfies Cta,
  },

  profiles: {
    title: "No todos los hoteles necesitan lo mismo",
    lead: "Por eso no empezamos por nuestros productos. Empezamos por tu hotel",
  },

  innovation: {
    eyebrow: "Innovación aplicada",
    title: "Tecnología que no solo resuelve. También se adelanta",
    lead: "No innovamos para añadir más tecnología al hotel. Innovamos cuando encontramos una forma de quitar trabajo, reducir complejidad o mejorar la experiencia del huésped",
  },

  iandrea: {
    eyebrow:
      "Una llamada de recepción que no atiende puede ser una reserva que se pierde",
    title: "iAndrea",
    subtitle: "La voz con inteligencia artificial de Comunica para hoteles",
    /**
     * Solo la escena de apertura. Los tres parrafos que empezaban por "Puede..."
     * salen de aqui y pasan a `capabilities`: eran una enumeracion disfrazada de
     * prosa —tres frases con seis o siete acciones cada una— y en pantalla se
     * leian como un muro de texto. La informacion es la misma, troceada en las
     * unidades que ya tenia dentro.
     */
    body: [
      "En recepción no siempre se puede coger el teléfono. Hay huéspedes delante. Check-ins. Incidencias. Consultas. Momentos en los que simplemente no quedan más manos.",
      "iAndrea está para esos momentos. Y para muchos otros.",
    ],
    /** El segundo parrafo va destacado. */
    bodyHighlightIndex: 1,

    /** Rotulo de la rejilla de capacidades. */
    canLabel: "iAndrea puede:",
    /**
     * Las capacidades, una por celda y con icono. Desglosadas literalmente de
     * los tres parrafos "Puede..." de la demo aprobada: no hay copy inventado,
     * solo separado.
     */
    capabilities: [
      {
        title: "Atender llamadas 24/7",
        description:
          "Sin franjas sin cobertura y sin que una llamada fuera de horario se pierda.",
        icon: "phone-call",
      },
      {
        title: "Responder preguntas frecuentes",
        description:
          "Horarios, servicios, ubicación o condiciones, resueltos en la propia llamada.",
        icon: "help-circle",
      },
      {
        title: "Gestionar reservas y recoger datos",
        description:
          "Toma la información que necesitas y la deja registrada donde corresponde.",
        icon: "calendar-range",
      },
      {
        title: "Cualificar y derivar a una persona",
        description:
          "Cuando la conversación necesita intervención humana, la pasa con el contexto.",
        icon: "users",
      },
      {
        title: "Atender varias llamadas a la vez",
        description:
          "La centralita deja de tener un límite de manos disponibles en recepción.",
        icon: "layers",
      },
      {
        title: "Hablar en más de 15 idiomas",
        description:
          "El huésped recibe respuesta en su idioma sin depender del turno de guardia.",
        icon: "globe",
      },
      {
        title: "Integrarse con tus sistemas",
        description:
          "Reservas, CRM, ERP y centralitas IP: consulta información y ejecuta acciones durante la conversación.",
        icon: "workflow",
      },
    ] satisfies readonly {
      title: string;
      description: string;
      icon: IconName;
    }[],
    benefits: [
      "Menos llamadas perdidas",
      "Menos interrupciones",
      "Más capacidad de atención",
    ],
    closing:
      "No viene a sustituir a recepción. Viene a conseguir que recepción pueda centrarse en lo que necesita a una persona.",
    closingHighlight:
      "IA pensada para quitar trabajo al equipo. No para darle otra herramienta que gestionar.",
    cta: { label: "Conoce iAndrea", href: `${routes.soluciones}#iandrea` } satisfies Cta,
  },

  extension: {
    eyebrow: "Innovación en telefonía hotelera",
    title: "Extensión Dinámica",
    subtitle: "La extensión de la habitación, en el móvil del huésped",
    body: [
      "El teléfono de la habitación lleva décadas formando parte del hotel.",
      "Pero muchos huéspedes ya llevan en el bolsillo el dispositivo con el que prefieren comunicarse.",
      "Con la Extensión Dinámica de Comunica, el huésped escanea un código QR y puede utilizar su propio móvil como extensión de la habitación durante su estancia.",
    ],
    benefits: ["Menos hardware", "Menos mantenimiento", "Experiencia mobile-first"],
    closing:
      "Para el hotel, supone una nueva forma de plantear la telefonía de las habitaciones y resulta especialmente interesante en reformas, ampliaciones y nuevos proyectos.",
    cta: {
      label: "Conoce la Extensión Dinámica",
      href: `${routes.contacto}?intent=extension`,
    } satisfies Cta,
    /** Textos del mockup del flujo QR. */
    mockup: {
      room: "Habitación 304",
      guestStatus: "Huésped conectado",
      qrLabel: "Código QR en la habitación",
      qrAction: "Escanear al llegar",
      phoneLabel: "Móvil del huésped",
      extActive: "Ext. 304 Activa",
      actions: ["Llamada directa a Recepción", "Room Service"],
    },
  },

  differentials: {
    /**
     * Tres lineas, partidas desde el copy y no dejadas al navegador.
     *
     * Es una gradacion: se niega el perfil equivocado, se nombra el correcto y
     * se cierra con la marca. Las tres frases tienen que caer una debajo de otra
     * para que se lea como escalera; si el navegador reparte los 118 caracteres
     * por ancho, el corte cae a mitad de frase y la figura desaparece.
     *
     * La tercera es el remate y se pinta en cyan, igual que la segunda linea del
     * titular del hero: es el unico sitio de la seccion donde aparece la marca.
     */
    titleLines: [
      "No necesitas un proveedor que sepa de telecomunicaciones.",
      "Necesitas uno que entienda tu hotel.",
      "Necesitas a Comunica.",
    ],
    /** Version en una linea, para metadatos y usos sin maquetar. */
    title:
      "No necesitas un proveedor que sepa de telecomunicaciones. Necesitas uno que entienda tu hotel. Necesitas a Comunica.",
    items: [
      {
        title: "Especialización hotelera",
        description:
          "Llevamos años resolviendo problemas tecnológicos en hoteles reales. Eso significa que cuando nos cuentas lo que ocurre, no tienes que explicarnos primero cómo funciona tu negocio.",
      },
      {
        title: "Todo conectado bajo una misma gestión",
        description:
          "Voz, conectividad, WiFi, IPTV, IA e integraciones pueden trabajar bajo un mismo equipo. Menos interlocutores. Menos complejidad.",
      },
      {
        title: "Soporte con nombre propio",
        description:
          "Cuando surge un problema, no deberías empezar explicando qué tienes contratado. Hay personas detrás del servicio que conocen tu instalación y entienden el contexto.",
      },
      {
        title: "Integración con la operativa hotelera",
        description:
          "La tecnología no debería vivir aislada. La conectamos con los sistemas y procesos del hotel para que trabaje a favor de la operación.",
      },
      {
        title: "Mirar más allá del problema de hoy",
        description:
          "Resolver importa. Pero también detectar qué podría mejorar antes de que se convierta en un problema. Hoy resolvemos. Queremos ayudarte también a anticiparte.",
      },
    ] satisfies ValueItem[],
  },

  method: {
    /**
     * El titular de la seccion es ahora la pregunta, y la frase que antes hacia
     * de titular baja a subtitulo. Peticion de cliente, y ademas ordena mejor la
     * lectura: "¿Como trabajamos?" nombra la seccion en tres palabras y la
     * promesa —empezamos por entender, no por vender— pasa a ser la respuesta.
     */
    title: "¿Cómo trabajamos?",
    subtitle: "Empezamos por entender tu hotel. No por venderte un paquete",
    steps: [
      {
        number: "1",
        title: "Hablamos",
        description:
          "Nos cuentas cómo funciona tu establecimiento o cadena, qué proveedores tienes y qué quieres mejorar.",
      },
      {
        number: "2",
        title: "Revisamos",
        description:
          "Analizamos los servicios contratados y, cuando procede, la factura y la instalación para detectar duplicidades, servicios innecesarios o puntos de mejora.",
      },
      {
        number: "3",
        title: "Diagnosticamos",
        description:
          "Revisamos la infraestructura que afecta al proyecto: conectividad, cobertura WiFi, voz, capacidad, integraciones o aquello que necesitemos conocer.",
      },
      {
        number: "4",
        title: "Proponemos",
        description:
          "Te presentamos una solución adaptada al problema detectado y un plan para llevarla a cabo.",
      },
      {
        number: "5",
        title: "Migramos",
        description:
          "Coordinamos la implantación buscando preservar la continuidad de la operación del hotel.",
      },
      {
        number: "6",
        title: "Nos quedamos",
        description:
          "Una vez implantada la solución, seguimos ahí. Soporte, seguimiento y revisión para seguir detectando oportunidades de mejora.",
      },
    ] satisfies ProcessStep[],
  },

  finalCta: {
    title:
      "¿Qué parte de la tecnología de tu hotel te está dando más trabajo del que debería?",
    body: [
      "Cuéntanoslo.",
      "No necesitas saber qué producto necesitas. Necesitas saber qué quieres resolver.",
    ],
    highlight: "Nosotros empezaremos por ahí.",
    ctas: [
      { label: "Habla con un especialista hotelero", href: routes.contacto, variant: "cyan" },
      {
        label: "Solicita una revisión de tu factura",
        href: `${routes.contacto}?intent=factura`,
        variant: "white",
      },
    ] satisfies Cta[],
  },
} as const;

/** Formula de la calculadora, literal de la demo: 18 % a 35 %. */
export const calculator = {
  rooms: { min: 10, max: 300, step: 10, default: 60 },
  spend: { min: 200, max: 8000, step: 100, default: 1500 },
  minRatio: 0.18,
  maxRatio: 0.35,
} as const;
