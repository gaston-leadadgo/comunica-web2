import { routes } from "./site";
import type { Cta } from "./schema";

/**
 * Copy de Nosotros. Transcripcion literal de la demo aprobada
 * (Copys/src/components/AboutSection.tsx), con la ortografia corregida.
 *
 * Ocho bloques, en este orden: hero, "sabemos donde tiene que funcionar",
 * la cifra, confianza, un equipo, innovacion, anticipacion y cierre.
 *
 * NOTA DE INVESTIGACION (no implementada, pendiente de autorizacion): Comunica
 * se fundo en 2020 y en 2022 lanzo con Grupo Hotusa "The Hotels Technology". Es
 * la prueba de credibilidad mas potente disponible frente a un director de IT
 * hotelero y no aparece en ningun material entregado. Son marcas de terceros, asi
 * que no se publica sin confirmacion por escrito.
 */
export const nosotros = {
  hero: {
    eyebrow: "Comunica",
    titleLine1: "No somos un operador que también trabaja con hoteles.",
    titleLine2: "Somos especialistas en tecnología hotelera",
    kicker: "Y la diferencia importa",
    lead: "Porque para resolver correctamente la tecnología de un hotel no basta con saber de redes, telefonía o WiFi. Hay que entender qué ocurre dentro del hotel cuando esa tecnología falla.",
  },

  knowledge: {
    title: "Sabemos de tecnología y también dónde tiene que funcionar",
    items: [
      "Sabemos qué significa una recepción en hora punta.",
      "Una propiedad que no puede perder conectividad.",
      "Varias sedes que deberían trabajar como una.",
      "Una integración que afecta a la experiencia del huésped.",
      "O una incidencia que no entiende de horarios de oficina.",
    ],
    body: [
      "Por eso Comunica combina distintas capacidades bajo una misma forma de trabajar.",
      "Somos operador. Integramos tecnología. Gestionamos proyectos. Asesoramos. Implantamos. Damos soporte.",
    ],
    /** El parrafo de cierre lleva el enfasis dentro, asi que va partido. */
    conclusion: {
      before:
        "Pero ninguna de esas etiquetas explica por sí sola lo que hacemos. La que realmente importa es otra:",
      emphasis: "Especialistas en hoteles.",
      /** El banner cerraba el argumento sin ofrecer ninguna salida. */
      cta: {
        label: "Habla con un especialista",
        href: routes.contacto,
      } satisfies Cta,
    },
  },

  scale: {
    /** PENDIENTE DE CONFIRMACION DEL CLIENTE: cifras de portada. */
    claim: "350 hoteles. 13 países",
    body: [
      "Nuestra especialización no nace de una declaración de intenciones. Nace de haber trabajado con cientos de hoteles y haber tenido que resolver problemas reales dentro de ellos.",
      "Cada proyecto nos permite entender mejor qué necesita un establecimiento, qué cambia cuando hablamos de una cadena y dónde una solución aparentemente correcta puede fallar cuando llega a la operativa real.",
    ],
    highlight:
      "Ese conocimiento acumulado es parte del servicio que recibe cada nuevo cliente.",
  },

  trust: {
    title: "Confiable no es una palabra bonita. Es una forma de trabajar",
    lead: "Queremos que nuestros clientes puedan delegar. Que cuando aparezca un problema sepan a quién llamar. Que no tengan que empezar cada conversación explicando desde cero qué tienen instalado. Y que cuando exista una forma mejor de hacer algo, no tengan que ser siempre ellos quienes la descubran.",
    itemsLabel: "Para nosotros, confianza significa:",
    items: [
      "Escuchar antes de proponer.",
      "Recomendar lo que tiene sentido.",
      "Ejecutar, no quedarnos en el asesoramiento.",
      "Dar la cara cuando algo falla.",
      "Y seguir pensando en cómo mejorar después de haber implantado la solución.",
    ],
    closing:
      "Porque la confianza no se consigue con palabras, sino resolviendo problemas una y otra vez.",
  },

  team: {
    title: "Un equipo. Muchas capacidades",
    body: [
      "Hay empresas excelentes en conectividad. Otras en WiFi. Otras en IPTV. Otras en voz. Y otras se especializan en inteligencia artificial.",
      "Nuestra fortaleza es poder entender el conjunto. Y hacernos cargo de la complejidad que aparece cuando todas esas piezas tienen que funcionar juntas.",
    ],
    cases: [
      {
        label: "Para un hotel independiente",
        text: "«Aquí me lo pueden resolver.»",
      },
      {
        label: "Para una cadena",
        text: "Simplificar proveedores, propiedades, integraciones y gestión administrativa.",
      },
    ],
  },

  innovation: {
    title: "Tecnología que resuelve lo de hoy y se anticipa a lo de mañana",
    body: [
      "No creemos que innovar consista en añadir tecnología porque esté de moda. Consiste en detectar cuándo una nueva solución puede hacer más sencilla la operación, mejorar la experiencia del huésped o quitar trabajo al equipo.",
      "iAndrea es un ejemplo de esa forma de entender la innovación. No nace para que un hotel pueda decir que utiliza inteligencia artificial. Nace para que una llamada no se pierda porque recepción está ocupada, para que determinadas consultas no interrumpan continuamente al equipo y para que la tecnología absorba tareas que no necesitan a una persona.",
    ],
    closing:
      "Ese es el tipo de innovación que nos interesa. Tecnología útil. Aplicada con sentido.",
  },

  ahead: {
    /**
     * Partido en dos lineas desde el copy, no dejado al navegador.
     *
     * Es una antitesis ("hoy X / mañana Y") y solo funciona si las dos mitades
     * caen una debajo de otra. Dejando que el navegador reparta la frase, el
     * corte caia donde tocase por ancho —a mitad de "Mañana nos anticipamos"—
     * y la figura se perdia.
     */
    titleLine1: "Hoy resolvemos.",
    titleLine2: "Mañana nos anticipamos",
    /** Version en una linea, para metadatos y usos sin maquetar. */
    title: "Hoy resolvemos. Mañana nos anticipamos",
    body: [
      "No queremos limitarnos a reaccionar cuando algo falla. Queremos conocer suficientemente bien tu hotel como para poder proponerte mejoras antes de que tengas que pedirlas.",
      "Porque ser un buen partner tecnológico no consiste solo en responder. También consiste en mirar un poco más adelante.",
    ],
  },

  finalCta: {
    title: "¿Hay algo que podría funcionar mejor en tu hotel?",
    body: ["Cuéntanoslo.", "Puede que ya sepamos cómo resolverlo."],
    highlight: "Y puede que detectemos algo que todavía no habías considerado.",
    cta: { label: "Habla con Comunica", href: routes.contacto } satisfies Cta,
  },
} as const;
