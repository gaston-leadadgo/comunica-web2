/**
 * Registro de imagenes.
 *
 * Esta es la pieza que permite montar la web ANTES de que existan las fotos.
 * Cada asset declara su ratio y su alt definitivo, y un flag `ready`. Mientras
 * `ready` sea `false`, `SmartImage` pinta un hueco con el mismo aspect-ratio y el
 * nombre del fichero que falta; al poner la foto y cambiar el flag, el layout no
 * se mueve (CLS 0).
 *
 * El `prompt` vive junto al asset a proposito: `docs/PROMPTS-IMAGENES.md` se
 * genera desde aqui (`npm run images:doc`), asi que el documento que usa el
 * cliente y el codigo no pueden desincronizarse.
 *
 * Como se usan los prompts: [PROMPT] + [BLOQUE DE ESTILO segun `grading`].
 * El bloque va literal, sin resumir.
 *
 * ---------------------------------------------------------------------------
 * REVISION DE CLIENTE - direccion de arte
 *
 * El publico objetivo son dueños y gestores de hoteles pequeños, y la peticion
 * es que las imagenes muestren a esas personas en su propio hotel, equilibrando
 * hoteleria y tecnologia. Eso cambia la direccion anterior, que era
 * deliberadamente vacia de personas.
 *
 * Las tres reglas que resuelven la tension "ni web de telco ni web de hotel":
 *
 * 1. La persona es un HOTELERO TRABAJANDO, no un modelo. Cuarenta a sesenta
 *    años, ropa real de trabajo, manos ocupadas, nunca mirando a camara. El
 *    encuadre la pilla a media tarea.
 * 2. Cada foto lleva una señal hotelera evidente y una señal tecnica pequeña, y
 *    la tecnica siempre es incidental: un punto de estado, un telefono IP, un
 *    punto de acceso en el techo. Si la tecnologia es el sujeto, es una web de
 *    telco; si no aparece, es una web de hotel.
 * 3. Veto de imagineria vacacional. Nada de piscinas, playas, atardeceres,
 *    copas, parejas de vacaciones ni suites de revista. Esto es el negocio visto
 *    desde dentro, en horas muertas, no el folleto.
 */

export type Grading = "A" | "B";

export type ImageAsset = {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  usage: string;
  role: "hero" | "apoyo" | "mockup" | "textura" | "bodegon" | "retrato" | "og";
  grading: Grading;
  safeArea?: string;
  /** `true` = plancha Tier B: la UI real se compone encima por CSS. */
  plate?: boolean;
  ready: boolean;
  prompt: string;
};

/** Placeholder de 1px en el gris calido de marca: evita el flash blanco. */
export const BLUR_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAPAAAO/r5gAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

export const HOUSE_STYLE: Record<Grading, string> = {
  A: `House style for this whole image set, follow it exactly: photograph it as if a single documentary photographer shot the entire series on a full-frame camera with a 40mm lens, natural available light only, no studio flash, no lens flare, no bokeh balls, no tilt-shift blur. Restrained European palette limited to warm off-white #FAFAF8, neutral warm grey #F1EFEC, deep navy #003057, near-black #1D1D1B, plus exactly one small accent of electric cyan #009FE3 that exists physically in the scene as a light, a screen glow or a status indicator. Bright exposure, gentle contrast, soft lifted shadows that read as deep navy rather than grey, highlights very slightly warm, overall saturation reduced about fifteen percent. Fine natural film grain. Photorealistic, calm, sober, precise, quietly expensive, European. When a person appears they are the owner or manager of a small independent hotel, between forty and sixty years old, in real working clothes rather than corporate suits, caught mid-task with their hands busy, at ease in a place they clearly run themselves; natural unposed expressions are welcome but nobody ever looks at the camera and nobody smiles at it. At most two people in frame. Absolutely avoid: stock-photo poses, people smiling at the camera, call-center headsets, handshakes, meeting rooms with sticky notes, people pointing at screens, models who look like models, holiday and brochure imagery of any kind including swimming pools, beaches, sunsets, cocktails, couples on holiday and glamour shots of luxury suites, floating holographic interfaces, glowing wireframe globes, world maps with connection lines, hexagon patterns, printed circuit boards, concentric signal waves, drawn clouds, 3D padlocks, teal-and-orange colour grading, and any text, lettering, numbers, logos or watermarks anywhere in the image.`,
  B: `House style for this whole image set, follow it exactly: photograph it as if a single documentary photographer shot the entire series on a full-frame camera with a 40mm lens, available light only, at night or in a dim interior, no studio flash, no lens flare, no bokeh balls. Restrained European palette limited to near-black #1D1D1B for the blacks (never pure black), deep navy #003057 in the midtones, and electric cyan #009FE3 for speculars, light trails and status glows. No green, no magenta, no yellow. Medium-high contrast with no clipped highlights, fine natural film grain equivalent to ISO 800. Photorealistic, calm, sober, precise, quietly expensive, European. When a person appears they are the owner or manager of a small independent hotel, between forty and sixty years old, in real working clothes rather than corporate suits, caught mid-task on a late shift; natural unposed expressions are welcome but nobody ever looks at the camera and nobody smiles at it. At most two people in frame. Absolutely avoid: stock-photo poses, people smiling at the camera, call-center headsets, handshakes, models who look like models, holiday and brochure imagery of any kind including swimming pools, beaches, sunsets and cocktails, floating holographic interfaces, glowing wireframe globes, world maps with connection lines, hexagon patterns, printed circuit boards, concentric signal waves, drawn clouds, 3D padlocks, teal-and-orange colour grading, and any text, lettering, numbers, logos or watermarks anywhere in the image.`,
};

/** Frase que se anade al final cuando se adjunta el ancla de estilo. */
export const ANCHOR_SUFFIX = `Match the colour grading, contrast curve, light quality, level of desaturation, skin rendering and overall mood of the attached reference image as closely as possible. Treat it as the same photographer, the same camera, the same day, the same post-production.`;

/**
 * Las dos anclas. Se generan primero y se iteran hasta el visto bueno.
 *
 * El ancla clara es ahora una foto CON persona, no el hero. El hero va al 16 %
 * de opacidad detras del titular, asi que como referencia no sirve: no fija
 * tonos de piel ni luz sobre una cara, que es justo lo que tiene que quedar
 * igual en toda la serie ahora que aparecen hoteleros.
 */
export const STYLE_ANCHORS = [
  "home-profile-conectado-independiente",
  "home-iandrea-phone-plate",
] as const;

export const images = {
  // ------------------------------------------------------------------ HOME
  "home-hero-lobby-umbral": {
    key: "home-hero-lobby-umbral",
    src: "/images/home/home-hero-lobby-umbral.webp",
    alt: "",
    width: 2752,
    height: 1536,
    usage:
      "Home / hero cinematográfico, fondo a sangre al 26 % bajo el lavado radial",
    role: "hero",
    grading: "A",
    safeArea:
      "Toda la franja central debe ser tranquila y de bajo detalle: encima va el titular centrado, el subtítulo y dos botones. Es un fondo, no una foto protagonista. Las señales que identifican la recepción (casillero de llaves, carro de equipajes, puertas de ascensor, butacas) van en los tercios laterales y en el inferior, nunca en el centro.",
    ready: true,
    prompt: `A wide 16:9 interior photograph of the reception hall of a small independent European hotel at 5:40 in the morning, before the first guest of the day appears. Keep exactly the same viewpoint as the previous version of this image: we stand where an arriving guest would stand and look at the reception from a low three-quarter angle, with the counter running diagonally across the right half of the frame and the hall opening up to the left. The single most important requirement: it must read immediately and unmistakably as the reception of a HOTEL, a public space at hotel scale, and never as the hallway of a private house or a guest house. The ceiling is high, the floor plan is generous, and the recognisable furniture of a hotel front desk is all present: a long continuous reception counter in dark stone over wood, deep and wide enough for two staff positions, with a small brass call bell, a card printer, a slim black IP desk phone and two plain blank white keycards lying flat on it; behind the counter a tall wooden wall of pigeonhole key compartments, all of them completely blank and unnumbered, with brass hooks and a few plain unmarked key fobs hanging from them, and beside it the dark opening of the back office; in the middle ground a brass luggage trolley with a canvas strap parked against a column, and further back a pair of brushed metal lift doors; on the left a pair of matching lobby armchairs and a low table, and one tall potted plant. A tall glazed entrance in the middle distance lets cool blue pre-dawn daylight enter and lays a soft reflection along the worn stone floor. On the desk phone, one small discreet status light glowing electric cyan #009FE3 - the only saturated colour in the whole frame. Deep navy shadows under the counter, warm off-white walls, brushed near-black metal details. The whole central band of the image is calm, evenly lit and low in detail, because large centred text will sit on top of it: the elements that identify the place as a hotel reception live in the left, right and lower thirds of the frame, never in the middle. Nobody is visible. This is a real working hotel, not a luxury brochure: comfortable, well kept, a little lived-in. The atmosphere is silent, disciplined, the calm of infrastructure that works before anyone notices it.`,
  },

  "home-profile-conectado-independiente": {
    key: "home-profile-conectado-independiente",
    src: "/images/home/home-profile-conectado-independiente.webp",
    alt: "La dueña de un hotel independiente trabajando en su recepción a primera hora",
    width: 1400,
    height: 1050,
    usage: "Home / acordeón de perfiles, panel Hotel Conectado",
    role: "apoyo",
    grading: "A",
    safeArea:
      "Deja el tercio superior derecho tranquilo: es la imagen de referencia de toda la serie clara y conviene que la cara quede en el centro izquierda.",
    ready: true,
    prompt: `A photograph of the owner of a small independent European hotel of about eighty rooms, standing behind her own reception counter early in the morning, seen from the guest side at eye level. She is in her early fifties, wearing a simple dark cardigan and no corporate uniform, hair tied back, reading glasses pushed up on her head. She is looking down at a slim black IP desk phone she has just picked up, mid-task, completely absorbed in her own work and unaware of the camera. On the counter: a monitor seen from behind so the screen is not readable, a card printer, a wooden key rack on the wall behind her, and on the phone one small status light glowing electric cyan #009FE3. Warm off-white walls, a dark stone counter, one potted plant. Bright morning daylight from a window on the left falls across her face and hands. It is clearly a place where one person handles everything, and it is tidy and calm. Documentary, warm, unposed, absolutely not a stock photograph.`,
  },

  "home-profile-consolidado-grupo": {
    key: "home-profile-consolidado-grupo",
    src: "/images/home/home-profile-consolidado-grupo.webp",
    alt: "Dos responsables de un grupo hotelero revisando juntos una tablet en la oficina",
    width: 1400,
    height: 1050,
    usage: "Home / acordeón de perfiles, panel Hotel Consolidado",
    role: "apoyo",
    grading: "A",
    ready: true,
    prompt: `A photograph of two people who run a small European hotel group of a handful of properties, standing side by side at a high counter in a back-of-house office, both looking down at the same tablet held between them. A man in his late fifties in a plain shirt with rolled sleeves, and a woman in her forties in a dark apron over working clothes; they look like people who have run this business together for years, not like executives. The tablet screen is turned away from the camera so nothing on it is readable. Behind them: a plain warm off-white wall, a row of five identical blank key fobs hanging on small hooks, a coffee cup, a printer. One small electric cyan #009FE3 status light on a wall-mounted network box at the edge of the frame. Even daylight from a high window. Neither of them looks at the camera. Documentary, undramatic, real.`,
  },

  "home-profile-gestionado-cadena": {
    key: "home-profile-gestionado-cadena",
    src: "/images/home/home-profile-gestionado-cadena.webp",
    alt: "Responsable de operaciones caminando por un pasillo de hotel de cadena",
    width: 1400,
    height: 1050,
    usage: "Home / acordeón de perfiles, panel Hotel Gestionado",
    role: "apoyo",
    grading: "A",
    ready: true,
    prompt: `A photograph looking down the centre of a corridor in a mid-size European chain hotel, shot with a long lens so the identical doors repeat rhythmically into the distance. In the middle distance, walking away from the camera and slightly out of the centre, the operations manager: a man in his fifties in a plain jacket, one hand carrying a folder, glancing sideways at a room door as he passes. He is small in the frame; the repetition of the corridor is as much the subject as he is. Warm off-white walls, dark patterned carpet, brushed metal room plates catching the same highlight on every door, and a flush white ceiling access point in the foreground with one small electric cyan #009FE3 status light. Cool even daylight from a window at the far end. His back is to us, no face visible.`,
  },

  "home-profile-especializado-proyecto": {
    key: "home-profile-especializado-proyecto",
    src: "/images/home/home-profile-especializado-proyecto.webp",
    alt: "Rack de red con un único módulo nuevo integrado entre equipos existentes",
    width: 1400,
    height: 1050,
    usage: "Home / acordeón de perfiles, panel Proyecto Especializado",
    role: "apoyo",
    grading: "B",
    ready: true,
    prompt: `A close night photograph of a well-organised server rack in the technical room of a small hotel, where most of the equipment is older and slightly dusty but perfectly cabled, and exactly one module in the middle is visibly newer, cleaner and brighter, with a row of electric cyan #009FE3 link lights. Everything else is deep navy and near-black, lit only by the equipment LEDs. The point of the photograph is that only one piece was replaced: the rest keeps working. No people, no labels, no lettering. This is the one image in the series with no person in it, and it should feel like the quiet inside of the building.`,
  },

  "home-iandrea-phone-plate": {
    key: "home-iandrea-phone-plate",
    src: "/images/home/home-iandrea-phone-plate.webp",
    alt: "",
    width: 1600,
    height: 1200,
    usage: "Home / bloque iAndrea, columna derecha",
    role: "mockup",
    grading: "B",
    plate: true,
    safeArea:
      "La pantalla del móvil, limpia, frontal y en navy plano: encima se compone la interfaz de voz real por CSS.",
    ready: true,
    prompt: `A close night-time photograph of a modern smartphone lying face up and slightly angled on the wooden counter of a small hotel reception desk during the late shift, screen switched on but displaying nothing except one perfectly flat, evenly lit solid deep navy #003057 rectangle with absolutely no icons, no text, no interface elements and no status bar - a clean empty screen, because an interface will be composited onto it later. The phone screen must be sharp, unobstructed, rectangular and free of glare or reflections. Around it, the reception desk is dark: worn wood, a reception bell, the soft out-of-focus glow of a desk lamp behind, and a faint electric cyan #009FE3 rim light along the top edge of the phone. In the deep background, far out of focus and unrecognisable, the silhouette of someone sitting at the desk beyond. No hands touching the phone, no faces. Intimate, quiet, the hotel at one in the morning.`,
  },

  "home-extension-qr-room": {
    key: "home-extension-qr-room",
    src: "/images/home/home-extension-qr-room.webp",
    alt: "Mesilla de habitación de hotel con un pequeño soporte de sobremesa en blanco",
    width: 2400,
    height: 1350,
    usage:
      "Home / bloque Extensión Dinámica, cabecera de la columna visual. Ratio 16:9 para que la sección completa quepa en una pantalla.",
    role: "apoyo",
    grading: "A",
    safeArea:
      "El soporte de la mesilla debe quedar limpio y sin ningún código impreso: el QR se compone después. Encuadre panorámico, no vertical.",
    ready: true,
    prompt: `A wide horizontal photograph of the bedside table of a calm, modest hotel room in the late afternoon, shot from a shallow angle just above the surface so the composition is panoramic rather than tall. On the table: a small blank white acrylic tent card standing upright, completely empty with no printing, no code and no lettering of any kind, because a graphic will be composited onto it later; beside it a smartphone lying face down, and a slim reading lamp casting warm light. Behind, the corner of a crisply made bed and a warm off-white wall. Soft golden daylight from a window out of frame on the left, deep navy in the shadows. The old room telephone sits at the far right edge of the frame, its cable unplugged and coiled beside it. Nobody in frame. Ordinary, well kept, real: a room in a working hotel, not a suite in a brochure.`,
  },

  "home-differentials-engineer-hands": {
    key: "home-differentials-engineer-hands",
    src: "/images/home/home-differentials-engineer-hands.webp",
    alt: "Un técnico y el responsable del hotel revisando juntos el armario de red",
    width: 1400,
    height: 1750,
    usage: "Home / bento de diferenciales, celda vertical a dos filas",
    role: "apoyo",
    grading: "A",
    safeArea: "Franja inferior del 20 % de tono uniforme.",
    ready: true,
    prompt: `A vertical photograph of two people standing together in front of an open wall-mounted network cabinet in a back corridor of a small hotel. On the left, a technician in his thirties in a plain dark work polo, one hand seating a network cable into a patch panel, sleeves pushed up, no gloves. On the right and half a step back, the hotel manager, a woman in her fifties in working clothes, arms loosely folded, watching what he is doing with the calm attention of someone who wants to understand it rather than approve it. Neither looks at the camera; we see them three-quarters from behind and to the side, faces partly turned away. Inside the cabinet the cables are combed into perfect parallel lines and one link light glows electric cyan #009FE3. Beyond them the corridor continues, with a housekeeping trolley parked against the wall, out of focus. Soft even daylight from the left. The bottom fifth of the frame is out-of-focus floor with no detail, reserved for a caption. The image is about two people who understand each other, not about equipment.`,
  },

  "home-catalog-keycard-still": {
    key: "home-catalog-keycard-still",
    src: "/images/home/home-catalog-keycard-still.webp",
    alt: "Bodegón cenital con tarjeta llave, SIM, sensor y mando de televisión",
    width: 1400,
    height: 1750,
    usage: "Home / bento de valor, celda vertical a dos filas",
    role: "bodegon",
    grading: "A",
    ready: true,
    prompt: `A vertical overhead still-life photograph on a seamless warm off-white #FAFAF8 paper surface, arranged with the discipline of a museum display: a plain white hotel keycard, a nano SIM card, a small white matte sensor and a slim black television remote control, stacked in one clean vertical column with generous even gaps, all aligned to the same axis. Hard directional daylight from the upper left casts four crisp parallel shadows in deep navy. One object has a single tiny electric cyan #009FE3 LED lit. Nothing else in frame. Extremely clean editorial product photography, immaculate, almost clinical, with a lot of empty paper around the objects. This is the one deliberately abstract image in the set: it is the inventory of what goes into a hotel, laid out like evidence.`,
  },

  // -------------------------------------------------------------------- OG
  "og-plate-dark": {
    key: "og-plate-dark",
    src: "/images/og/og-plate-dark.webp",
    alt: "",
    width: 1200,
    height: 630,
    usage:
      "Plancha de fondo para las Open Graph. El texto se compone en build con next/og, nunca se genera con IA.",
    role: "og",
    grading: "B",
    safeArea: "Los dos tercios izquierdos, muy oscuros y planos.",
    ready: false,
    prompt: `A wide abstract background image, 1200 by 630 proportions. A very dark field of near-black #1D1D1B deepening into deep navy #003057 toward the lower right, with one single long elegant light trail in electric cyan #009FE3 entering from the bottom left corner and curving smoothly out through the right edge, thin and unbroken. Far behind it, barely perceptible, the out-of-focus silhouettes of urban architecture at night with a handful of tiny cool white lit windows. The entire left two thirds of the image must be extremely dark, flat and free of any detail so that a logo and a large headline can be placed on top with perfect legibility. No text, no lettering, no logos, no icons. Restrained, deep, elegant.`,
  },

  "og-plate-light": {
    key: "og-plate-light",
    src: "/images/og/og-plate-light.webp",
    alt: "",
    width: 1200,
    height: 630,
    usage: "Plancha de fondo clara para las Open Graph de secciones claras.",
    role: "og",
    grading: "A",
    safeArea: "Los dos tercios izquierdos, papel completamente vacío.",
    ready: false,
    prompt: `A wide abstract background image, 1200 by 630 proportions. A seamless warm off-white #FAFAF8 paper field with one single thin elegant arc stroke in a smooth gradient from deep navy #003057 to electric cyan #009FE3, entering from the top right corner and curving down and out through the right edge. The arc is the only element. Very soft raking daylight from the left creates an almost imperceptible tonal shift across the paper, with the faintest deep navy shadow along the arc. The entire left two thirds of the image is completely empty flat paper with no detail whatsoever, reserved for a logo and a large headline. No text, no lettering, no logos, no icons, no other shapes. Minimal, Swiss, immaculate.`,
  },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;

export function getImage(key: ImageKey): ImageAsset {
  return images[key];
}
