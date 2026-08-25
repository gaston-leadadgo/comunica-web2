# Comunica - Prompts de imagenes para Nano Banana / Gemini

Generado automaticamente desde `content/images.ts`. **No editar a mano**: cambia el registro y vuelve a ejecutar `npm run images:doc`.

**11 imagenes** en total.

---

## Direccion de arte

El publico objetivo son **dueños y gestores de hoteles pequeños**. Las imagenes tienen que mostrar a esas personas en su propio hotel, y equilibrar hoteleria y tecnologia. Las tres reglas que resuelven la tension entre "web de telco" y "web de hotel":

1. **La persona es un hotelero trabajando, no un modelo.** Cuarenta a sesenta años, ropa real de trabajo, manos ocupadas, pillado a media tarea. **Nunca mirando a camara.**
2. **Una señal hotelera evidente y una señal tecnica pequeña.** La tecnologia es siempre incidental: un punto de estado, un telefono IP, un punto de acceso en el techo. Si la tecnologia es el sujeto, parece una telco; si no aparece, parece un hotel.
3. **Veto de imagineria vacacional.** Nada de piscinas, playas, atardeceres, copas, parejas de vacaciones ni suites de revista. Es el negocio visto desde dentro, en horas muertas.

---

## Como usar este documento

Cada generacion es **[PROMPT ESPECIFICO] + [BLOQUE DE ESTILO]**, pegados uno detras del otro. Cada ficha indica que bloque le toca: **A** (lado huesped, secciones claras), **B** (lado tecnico, secciones oscuras) o **C** (imagen de producto de iAndrea).

**El bloque C es la excepcion deliberada de todo el documento.** Las reglas de direccion de arte de arriba describen la serie fotografica, donde la tecnologia es incidental para que la web no parezca de una telco. En el bloque que explica que es iAndrea esa regla juega en contra: quien llega ahi quiere ver el producto. La gradacion C es abiertamente tecnologica —interfaz de voz luminosa, ondas, burbujas de conversacion, iconos conectados— y esta alineada con las creatividades que iAndrea ya usa en campaña. **A las imagenes C no se les aplican las tres reglas ni el checklist de la serie**, solo la paleta de marca y la prohibicion de texto.

El bloque de estilo se pega **literal, sin editar ni resumir**. Cualquier reescritura introduce deriva y la serie deja de parecer del mismo fotografo.

### Orden de trabajo, importa

1. **Genera primero las dos anclas** y solo esas: `home-profile-conectado-independiente` (bloque A) y `home-profile-especializado-proyecto` (bloque B). Iteralas hasta que el grading sea exactamente el que quieres. Guardalas como `_style-anchor-light.png` y `_style-anchor-dark.png`, **fuera** de la carpeta del proyecto. Es la unica decision irreversible de todo el bloque de imagenes.
2. **Adjunta el ancla correspondiente en todas las generaciones siguientes** y anade esta frase al final del prompt, despues del bloque de estilo:

   > Match the colour grading, contrast curve, light quality, level of desaturation, skin rendering and overall mood of the attached reference image as closely as possible. Treat it as the same photographer, the same camera, the same day, the same post-production.

3. **Una sola sesion de chat por bloque.** Todas las A en un hilo, todas las B en otro. Gemini no expone semillas numericas: el contexto de la conversacion es tu semilla, y mantenerlo es lo que evita que la serie se disperse.
4. **Normalizacion final en lote, obligatoria.** Aunque salgan bien, pasa las imagenes por el mismo ajuste antes de exportar: una curva identica que fije el punto negro en `#1D1D1B`, el blanco en `#FAFAF8` y un split-toning que empuje las sombras a `#003057`. Esto es lo que unifica de verdad; el resto es aproximacion.
5. **Exporta a WebP con calidad 82** y respeta exactamente el nombre de archivo de cada ficha. Colocalas en `public/images/<pagina>/`.
6. **Hoja de contacto antes de integrar.** Monta todas en una sola hoja de 6x6 y mirala al 25 %. Si alguna salta, regenerala. Ninguna imagen se juzga aislada.

### Checklist por imagen (solo bloques A y B)

- Tiene **exactamente un** acento cyan, y existe fisicamente en la escena.
- **Nadie** mira a camara, y nadie sonrie a camara.
- Si hay persona: **parece un hotelero trabajando**, no un modelo. Ropa real, manos ocupadas, a media tarea.
- Hay una **señal hotelera evidente** (mostrador, llave, carro de gobernanta, cama hecha) y la tecnologia es **incidental**.
- **Cero** imagineria vacacional: ni piscina, ni playa, ni atardecer, ni copas.
- **No hay** texto, letras, numeros, logos ni marcas de agua dentro.
- La zona segura esta **realmente vacia**, no solo poco cargada.

### Sobre las planchas (fichas marcadas como *plancha*)

Nano Banana no escribe texto legible: un dashboard generado por IA con palabras dentro produce jerigonza y mata la credibilidad ante un director de IT hotelero. Por eso, en las planchas el prompt pide **la pantalla en navy plano, sin contenido, sin reflejos y sin distorsion**. La interfaz real se compone despues por CSS sobre la foto.

---

## Indice

| # | Archivo | Pagina | Rol | Ratio | Px | Bloque |
|---|---|---|---|---|---|---|
| 1 | `home-hero-lobby-umbral` | Home | Hero de pagina | 16:9 | 2752x1536 | A |
| 2 | `home-profile-conectado-independiente` | Home | Apoyo de seccion | 4:3 | 1400x1050 | A |
| 3 | `home-profile-consolidado-grupo` | Home | Apoyo de seccion | 4:3 | 1400x1050 | A |
| 4 | `home-profile-gestionado-cadena` | Home | Apoyo de seccion | 4:3 | 1400x1050 | A |
| 5 | `home-profile-especializado-proyecto` | Home | Apoyo de seccion | 4:3 | 1400x1050 | B |
| 6 | `home-iandrea-voice-ai` | Home | Mockup de producto | 4:3 | 1448x1086 | C |
| 7 | `home-extension-qr-room` | Home | Apoyo de seccion | 16:9 | 2752x1536 | A |
| 8 | `home-differentials-engineer-hands` | Home | Apoyo de seccion | 4:5 | 1400x1750 | A |
| 9 | `home-catalog-keycard-still` | Home | Bodegon editorial | 4:5 | 1400x1750 | A |
| 10 | `og-plate-dark` | Open Graph | Plancha Open Graph | 40:21 | 1200x630 | B |
| 11 | `og-plate-light` | Open Graph | Plancha Open Graph | 40:21 | 1200x630 | A |

---

## Bloques de estilo

### Bloque A - lado huesped (secciones claras)

```text
House style for this whole image set, follow it exactly: photograph it as if a single documentary photographer shot the entire series on a full-frame camera with a 40mm lens, natural available light only, no studio flash, no lens flare, no bokeh balls, no tilt-shift blur. Restrained European palette limited to warm off-white #FAFAF8, neutral warm grey #F1EFEC, deep navy #003057, near-black #1D1D1B, plus exactly one small accent of electric cyan #009FE3 that exists physically in the scene as a light, a screen glow or a status indicator. Bright exposure, gentle contrast, soft lifted shadows that read as deep navy rather than grey, highlights very slightly warm, overall saturation reduced about fifteen percent. Fine natural film grain. Photorealistic, calm, sober, precise, quietly expensive, European. When a person appears they are the owner or manager of a small independent hotel, between forty and sixty years old, in real working clothes rather than corporate suits, caught mid-task with their hands busy, at ease in a place they clearly run themselves; natural unposed expressions are welcome but nobody ever looks at the camera and nobody smiles at it. At most two people in frame. Absolutely avoid: stock-photo poses, people smiling at the camera, call-center headsets, handshakes, meeting rooms with sticky notes, people pointing at screens, models who look like models, holiday and brochure imagery of any kind including swimming pools, beaches, sunsets, cocktails, couples on holiday and glamour shots of luxury suites, floating holographic interfaces, glowing wireframe globes, world maps with connection lines, hexagon patterns, printed circuit boards, concentric signal waves, drawn clouds, 3D padlocks, teal-and-orange colour grading, and any text, lettering, numbers, logos or watermarks anywhere in the image.
```

### Bloque B - lado tecnico (secciones oscuras)

```text
House style for this whole image set, follow it exactly: photograph it as if a single documentary photographer shot the entire series on a full-frame camera with a 40mm lens, available light only, at night or in a dim interior, no studio flash, no lens flare, no bokeh balls. Restrained European palette limited to near-black #1D1D1B for the blacks (never pure black), deep navy #003057 in the midtones, and electric cyan #009FE3 for speculars, light trails and status glows. No green, no magenta, no yellow. Medium-high contrast with no clipped highlights, fine natural film grain equivalent to ISO 800. Photorealistic, calm, sober, precise, quietly expensive, European. When a person appears they are the owner or manager of a small independent hotel, between forty and sixty years old, in real working clothes rather than corporate suits, caught mid-task on a late shift; natural unposed expressions are welcome but nobody ever looks at the camera and nobody smiles at it. At most two people in frame. Absolutely avoid: stock-photo poses, people smiling at the camera, call-center headsets, handshakes, models who look like models, holiday and brochure imagery of any kind including swimming pools, beaches, sunsets and cocktails, floating holographic interfaces, glowing wireframe globes, world maps with connection lines, hexagon patterns, printed circuit boards, concentric signal waves, drawn clouds, 3D padlocks, teal-and-orange colour grading, and any text, lettering, numbers, logos or watermarks anywhere in the image.
```

### Bloque C - imagen de producto de iAndrea

Solo para la ficha de iAndrea. Aqui la tecnologia **es** el sujeto, a proposito. No se combina con los bloques A ni B.

```text
House style for this image, follow it exactly. This is the PRODUCT image of iAndrea, the voice AI agent, so unlike the rest of this image set it is openly, deliberately and unapologetically technological: technology is THE SUBJECT here, not an incidental detail. Premium enterprise-software campaign photography combined with clean luminous interface graphics: real photographed hardware and real materials, with crisp emissive interface elements rendered in front of and on the screens. Sharp, bright, confident, optimistic. Brand palette, strictly enforced: deep navy #003057 for the dark fields and the sense of depth, electric cyan #009FE3 for every glow, light trail, interface stroke and specular highlight, warm off-white #FAFAF8 and neutral warm grey #F1EFEC for the real-world surfaces, near-black #1D1D1B for the hardware. No green, no magenta, no purple, no orange, no teal-and-orange grading. All of the following are welcome, expected and encouraged: glowing voice waveforms, concentric voice rings radiating from a speaking source, luminous speech and conversation bubbles, thin bright connection lines linking simple glowing icons, soft holographic overlays floating just above a screen, delicate circuit-like tracery, and a luminous cyan orb or halo standing for the voice assistant itself. Render them as clean geometry with thin strokes, a soft outer glow and generous empty space around each element - luminous and precise, never a dense cluttered mess. What is still absolutely forbidden, and this one is not a style preference: any text, lettering, words, numbers, logos, wordmarks or watermarks anywhere in the image, including on every screen and display. An image model renders lettering as gibberish, and a garbled brand name on a laptop screen destroys the credibility of the whole page; the iAndrea wordmark and any real copy are composited afterwards in design software. Also avoid: cheap sci-fi clutter, dense circuit-board wallpaper, wireframe globes, world maps with connection lines, hexagon grids, falling matrix code, lens flares, chrome humanoid androids, and stock-photo staff grinning at the camera. Photorealistic where it is photographic, immaculate where it is graphic, quietly expensive, European.
```

---

## Fichas

### Home (9)

#### 1. `home-hero-lobby-umbral`

- **Archivo:** `public/images/home/home-hero-lobby-umbral.webp`
- **Donde va:** Home / hero cinematográfico, fondo a sangre al 38 % bajo el lavado radial
- **Rol:** Hero de pagina
- **Tamano:** 2752 x 1536 px (16:9)
- **Bloque de estilo:** A
- **Zona segura:** Toda la franja central debe ser tranquila y de bajo detalle: encima va el titular centrado, el subtítulo y dos botones. Es un fondo, no una foto protagonista. Las señales que identifican la recepción (casillero de llaves, carro de equipajes, puertas de ascensor, butacas) van en los tercios laterales y en el inferior, nunca en el centro.

```text
A wide 16:9 interior photograph of the reception hall of a small independent European hotel at 5:40 in the morning, before the first guest of the day appears. Keep exactly the same viewpoint as the previous version of this image: we stand where an arriving guest would stand and look at the reception from a low three-quarter angle, with the counter running diagonally across the right half of the frame and the hall opening up to the left. The single most important requirement: it must read immediately and unmistakably as the reception of a HOTEL, a public space at hotel scale, and never as the hallway of a private house or a guest house. The ceiling is high, the floor plan is generous, and the recognisable furniture of a hotel front desk is all present: a long continuous reception counter in dark stone over wood, deep and wide enough for two staff positions, with a small brass call bell, a card printer, a slim black IP desk phone and two plain blank white keycards lying flat on it; behind the counter a tall wooden wall of pigeonhole key compartments, all of them completely blank and unnumbered, with brass hooks and a few plain unmarked key fobs hanging from them, and beside it the dark opening of the back office; in the middle ground a brass luggage trolley with a canvas strap parked against a column, and further back a pair of brushed metal lift doors; on the left a pair of matching lobby armchairs and a low table, and one tall potted plant. A tall glazed entrance in the middle distance lets cool blue pre-dawn daylight enter and lays a soft reflection along the worn stone floor. On the desk phone, one small discreet status light glowing electric cyan #009FE3 - the only saturated colour in the whole frame. Deep navy shadows under the counter, warm off-white walls, brushed near-black metal details. The whole central band of the image is calm, evenly lit and low in detail, because large centred text will sit on top of it: the elements that identify the place as a hotel reception live in the left, right and lower thirds of the frame, never in the middle. Nobody is visible. This is a real working hotel, not a luxury brochure: comfortable, well kept, a little lived-in. The atmosphere is silent, disciplined, the calm of infrastructure that works before anyone notices it.
```

#### 2. `home-profile-conectado-independiente`  **← ANCLA DE ESTILO, generar primero**

- **Archivo:** `public/images/home/home-profile-conectado-independiente.webp`
- **Donde va:** Home / acordeón de perfiles, panel Hotel Conectado
- **Rol:** Apoyo de seccion
- **Tamano:** 1400 x 1050 px (4:3)
- **Bloque de estilo:** A
- **Zona segura:** Deja el tercio superior derecho tranquilo: es la imagen de referencia de toda la serie clara y conviene que la cara quede en el centro izquierda.
- **Alt (ya redactado):** La dueña de un hotel independiente trabajando en su recepción a primera hora

```text
A photograph of the owner of a small independent European hotel of about eighty rooms, standing behind her own reception counter early in the morning, seen from the guest side at eye level. She is in her early fifties, wearing a simple dark cardigan and no corporate uniform, hair tied back, reading glasses pushed up on her head. She is looking down at a slim black IP desk phone she has just picked up, mid-task, completely absorbed in her own work and unaware of the camera. On the counter: a monitor seen from behind so the screen is not readable, a card printer, a wooden key rack on the wall behind her, and on the phone one small status light glowing electric cyan #009FE3. Warm off-white walls, a dark stone counter, one potted plant. Bright morning daylight from a window on the left falls across her face and hands. It is clearly a place where one person handles everything, and it is tidy and calm. Documentary, warm, unposed, absolutely not a stock photograph.
```

#### 3. `home-profile-consolidado-grupo`

- **Archivo:** `public/images/home/home-profile-consolidado-grupo.webp`
- **Donde va:** Home / acordeón de perfiles, panel Hotel Consolidado
- **Rol:** Apoyo de seccion
- **Tamano:** 1400 x 1050 px (4:3)
- **Bloque de estilo:** A
- **Alt (ya redactado):** Dos responsables de un grupo hotelero revisando juntos una tablet en la oficina

```text
A photograph of two people who run a small European hotel group of a handful of properties, standing side by side at a high counter in a back-of-house office, both looking down at the same tablet held between them. A man in his late fifties in a plain shirt with rolled sleeves, and a woman in her forties in a dark apron over working clothes; they look like people who have run this business together for years, not like executives. The tablet screen is turned away from the camera so nothing on it is readable. Behind them: a plain warm off-white wall, a row of five identical blank key fobs hanging on small hooks, a coffee cup, a printer. One small electric cyan #009FE3 status light on a wall-mounted network box at the edge of the frame. Even daylight from a high window. Neither of them looks at the camera. Documentary, undramatic, real.
```

#### 4. `home-profile-gestionado-cadena`

- **Archivo:** `public/images/home/home-profile-gestionado-cadena.webp`
- **Donde va:** Home / acordeón de perfiles, panel Hotel Gestionado
- **Rol:** Apoyo de seccion
- **Tamano:** 1400 x 1050 px (4:3)
- **Bloque de estilo:** A
- **Alt (ya redactado):** Responsable de operaciones caminando por un pasillo de hotel de cadena

```text
A photograph looking down the centre of a corridor in a mid-size European chain hotel, shot with a long lens so the identical doors repeat rhythmically into the distance. In the middle distance, walking away from the camera and slightly out of the centre, the operations manager: a man in his fifties in a plain jacket, one hand carrying a folder, glancing sideways at a room door as he passes. He is small in the frame; the repetition of the corridor is as much the subject as he is. Warm off-white walls, dark patterned carpet, brushed metal room plates catching the same highlight on every door, and a flush white ceiling access point in the foreground with one small electric cyan #009FE3 status light. Cool even daylight from a window at the far end. His back is to us, no face visible.
```

#### 5. `home-profile-especializado-proyecto`  **← ANCLA DE ESTILO, generar primero**

- **Archivo:** `public/images/home/home-profile-especializado-proyecto.webp`
- **Donde va:** Home / acordeón de perfiles, panel Proyecto Especializado
- **Rol:** Apoyo de seccion
- **Tamano:** 1400 x 1050 px (4:3)
- **Bloque de estilo:** B
- **Alt (ya redactado):** Rack de red con un único módulo nuevo integrado entre equipos existentes

```text
A close night photograph of a well-organised server rack in the technical room of a small hotel, where most of the equipment is older and slightly dusty but perfectly cabled, and exactly one module in the middle is visibly newer, cleaner and brighter, with a row of electric cyan #009FE3 link lights. Everything else is deep navy and near-black, lit only by the equipment LEDs. The point of the photograph is that only one piece was replaced: the rest keeps working. No people, no labels, no lettering. This is the one image in the series with no person in it, and it should feel like the quiet inside of the building.
```

#### 6. `home-iandrea-voice-ai`

- **Archivo:** `public/images/home/home-iandrea-voice-ai.webp`
- **Donde va:** Home / bloque iAndrea, columna derecha. Es la IMAGEN DE PRODUCTO de la sección que explica qué es iAndrea, así que va por gradación C y no por la serie fotográfica.
- **Rol:** Mockup de producto
- **Tamano:** 1448 x 1086 px (4:3)
- **Bloque de estilo:** C
- **Zona segura:** Ninguna zona reservada: no se compone nada encima por CSS. La generación final incluyó el wordmark "iAndrea" y la mascota bien renderizados —no era lo esperado, el prompt los prohibía por el riesgo de jerigonza, pero salieron correctos— así que no hace falta componer nada encima.
- **Alt (ya redactado):** Recepción de hotel con la interfaz de voz de iAndrea atendiendo llamadas

```text
A bright, modern, openly technological product image of an AI voice assistant working at the reception desk of a hotel, shot in landscape 4:3. The real, photographed half of the picture: an open laptop and a slim black IP desk phone standing on the pale stone reception counter in the lower right of the frame, and behind them, softly out of focus, the warm daylit lobby of a busy hotel with several guests waiting at the counter, reduced to gentle blurred shapes so that no face is identifiable and nobody is looking towards the camera. The graphic half, and this is the real subject: rising out of the laptop screen and floating in the air above the counter, a luminous electric cyan #009FE3 interface made of clean emissive geometry - a glowing cyan orb at its centre standing for the voice of the assistant, concentric voice rings radiating outward from it, a bright audio waveform curving across the screen, three or four rounded conversation bubbles floating at different depths, and thin bright connection lines fanning out from the orb to a handful of simple glowing outline icons that read unmistakably as a telephone handset, a calendar, a small clock and a globe. The interface elements are crisp, thin-stroked, softly glowing, arranged with generous empty space between them and clearly layered in front of the scene, like a premium enterprise software campaign visual. Deep navy #003057 fills the depth behind the graphics and pools in the shadows, cyan carries every glow and specular, the counter and the lobby stay warm off-white and neutral warm grey, the hardware is near-black. The image has to say, at a glance and with no caption at all: an artificial intelligence is answering this hotel's calls, in many languages, at the same time, while the front desk gets on with the guests in front of it. Absolutely no text, no lettering, no words, no numbers, no logos and no wordmarks anywhere, on the screens included. No chrome humanoid robot, no matrix code, no wireframe globe, no circuit-board wallpaper. Bright, confident, premium, optimistic.
```

#### 7. `home-extension-qr-room`

- **Archivo:** `public/images/home/home-extension-qr-room.webp`
- **Donde va:** Home / bloque Extensión Dinámica, cabecera de la columna visual. Ratio 16:9 para que la sección completa quepa en una pantalla.
- **Rol:** Apoyo de seccion
- **Tamano:** 2752 x 1536 px (16:9)
- **Bloque de estilo:** A
- **Zona segura:** El QR va IMPRESO en la tarjeta dentro de la propia foto (decisión de cliente, cambia el planteamiento anterior de componerlo por CSS). La cara de la tarjeta tiene que quedar frontal, plana, nítida y sin reflejos, y el código ocuparla casi entera. Encuadre panorámico, no vertical.
- **Alt (ya redactado):** Mesilla de habitación de hotel con un soporte de sobremesa con código QR

```text
A wide horizontal photograph of the bedside table of a calm, modest hotel room in the late afternoon, shot from a shallow angle just above the surface so the composition is panoramic rather than tall. The subject of the photograph is a small white acrylic tent card standing upright on the table, turned so that its front face is square to the lens and fully visible, and on that face, printed large and perfectly flat, a black and white QR code: a dense square matrix of small black modules on white, with the three characteristic solid square finder patterns in its top-left, top-right and bottom-left corners and a clean white quiet zone around the edge. The code fills most of the card face and must be sharp, high in contrast, unblurred, undistorted and free of glare or reflections. It is printed on the card as ink on plastic - not glowing, not projected, not floating in the air. Beside the card a smartphone lies face down, and a slim reading lamp casts warm light. Behind, the corner of a crisply made bed and a warm off-white wall. Soft golden daylight from a window out of frame on the left, deep navy in the shadows. The old room telephone sits at the far right edge of the frame, its cable unplugged and coiled beside it. Nobody in frame. Ordinary, well kept, real: a room in a working hotel, not a suite in a brochure. One explicit exception to the house style rule that forbids graphics: this square black and white code pattern is required and must be clearly visible. Apart from it there is still absolutely no text, no lettering, no numbers, no logos and no watermarks anywhere in the image.
```

#### 8. `home-differentials-engineer-hands`

- **Archivo:** `public/images/home/home-differentials-engineer-hands.webp`
- **Donde va:** Home / bento de diferenciales, celda vertical a dos filas
- **Rol:** Apoyo de seccion
- **Tamano:** 1400 x 1750 px (4:5)
- **Bloque de estilo:** A
- **Zona segura:** Franja inferior del 20 % de tono uniforme.
- **Alt (ya redactado):** Un técnico y el responsable del hotel revisando juntos el armario de red

```text
A vertical photograph of two people standing together in front of an open wall-mounted network cabinet in a back corridor of a small hotel. On the left, a technician in his thirties in a plain dark work polo, one hand seating a network cable into a patch panel, sleeves pushed up, no gloves. On the right and half a step back, the hotel manager, a woman in her fifties in working clothes, arms loosely folded, watching what he is doing with the calm attention of someone who wants to understand it rather than approve it. Neither looks at the camera; we see them three-quarters from behind and to the side, faces partly turned away. Inside the cabinet the cables are combed into perfect parallel lines and one link light glows electric cyan #009FE3. Beyond them the corridor continues, with a housekeeping trolley parked against the wall, out of focus. Soft even daylight from the left. The bottom fifth of the frame is out-of-focus floor with no detail, reserved for a caption. The image is about two people who understand each other, not about equipment.
```

#### 9. `home-catalog-keycard-still`

- **Archivo:** `public/images/home/home-catalog-keycard-still.webp`
- **Donde va:** Home / bento de valor, celda vertical a dos filas
- **Rol:** Bodegon editorial
- **Tamano:** 1400 x 1750 px (4:5)
- **Bloque de estilo:** A
- **Alt (ya redactado):** Bodegón cenital con tarjeta llave, SIM, sensor y mando de televisión

```text
A vertical overhead still-life photograph on a seamless warm off-white #FAFAF8 paper surface, arranged with the discipline of a museum display: a plain white hotel keycard, a nano SIM card, a small white matte sensor and a slim black television remote control, stacked in one clean vertical column with generous even gaps, all aligned to the same axis. Hard directional daylight from the upper left casts four crisp parallel shadows in deep navy. One object has a single tiny electric cyan #009FE3 LED lit. Nothing else in frame. Extremely clean editorial product photography, immaculate, almost clinical, with a lot of empty paper around the objects. This is the one deliberately abstract image in the set: it is the inventory of what goes into a hotel, laid out like evidence.
```

---

### Open Graph (2)

#### 10. `og-plate-dark`

- **Archivo:** `public/images/og/og-plate-dark.webp`
- **Donde va:** Plancha de fondo para las Open Graph. El texto se compone en build con next/og, nunca se genera con IA.
- **Rol:** Plancha Open Graph
- **Tamano:** 1200 x 630 px (40:21)
- **Bloque de estilo:** B
- **Zona segura:** Los dos tercios izquierdos, muy oscuros y planos.

```text
A wide abstract background image, 1200 by 630 proportions. A very dark field of near-black #1D1D1B deepening into deep navy #003057 toward the lower right, with one single long elegant light trail in electric cyan #009FE3 entering from the bottom left corner and curving smoothly out through the right edge, thin and unbroken. Far behind it, barely perceptible, the out-of-focus silhouettes of urban architecture at night with a handful of tiny cool white lit windows. The entire left two thirds of the image must be extremely dark, flat and free of any detail so that a logo and a large headline can be placed on top with perfect legibility. No text, no lettering, no logos, no icons. Restrained, deep, elegant.
```

#### 11. `og-plate-light`

- **Archivo:** `public/images/og/og-plate-light.webp`
- **Donde va:** Plancha de fondo clara para las Open Graph de secciones claras.
- **Rol:** Plancha Open Graph
- **Tamano:** 1200 x 630 px (40:21)
- **Bloque de estilo:** A
- **Zona segura:** Los dos tercios izquierdos, papel completamente vacío.

```text
A wide abstract background image, 1200 by 630 proportions. A seamless warm off-white #FAFAF8 paper field with one single thin elegant arc stroke in a smooth gradient from deep navy #003057 to electric cyan #009FE3, entering from the top right corner and curving down and out through the right edge. The arc is the only element. Very soft raking daylight from the left creates an almost imperceptible tonal shift across the paper, with the faintest deep navy shadow along the arc. The entire left two thirds of the image is completely empty flat paper with no detail whatsoever, reserved for a logo and a large headline. No text, no lettering, no logos, no icons, no other shapes. Minimal, Swiss, immaculate.
```

---

