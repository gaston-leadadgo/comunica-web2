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

Cada generacion es **[PROMPT ESPECIFICO] + [BLOQUE DE ESTILO]**, pegados uno detras del otro. Cada ficha indica que bloque le toca: **A** (lado huesped, secciones claras) o **B** (lado tecnico, secciones oscuras).

El bloque de estilo se pega **literal, sin editar ni resumir**. Cualquier reescritura introduce deriva y la serie deja de parecer del mismo fotografo.

### Orden de trabajo, importa

1. **Genera primero las dos anclas** y solo esas: `home-profile-conectado-independiente` (bloque A) y `home-iandrea-phone-plate` (bloque B). Iteralas hasta que el grading sea exactamente el que quieres. Guardalas como `_style-anchor-light.png` y `_style-anchor-dark.png`, **fuera** de la carpeta del proyecto. Es la unica decision irreversible de todo el bloque de imagenes.
2. **Adjunta el ancla correspondiente en todas las generaciones siguientes** y anade esta frase al final del prompt, despues del bloque de estilo:

   > Match the colour grading, contrast curve, light quality, level of desaturation, skin rendering and overall mood of the attached reference image as closely as possible. Treat it as the same photographer, the same camera, the same day, the same post-production.

3. **Una sola sesion de chat por bloque.** Todas las A en un hilo, todas las B en otro. Gemini no expone semillas numericas: el contexto de la conversacion es tu semilla, y mantenerlo es lo que evita que la serie se disperse.
4. **Normalizacion final en lote, obligatoria.** Aunque salgan bien, pasa las imagenes por el mismo ajuste antes de exportar: una curva identica que fije el punto negro en `#1D1D1B`, el blanco en `#FAFAF8` y un split-toning que empuje las sombras a `#003057`. Esto es lo que unifica de verdad; el resto es aproximacion.
5. **Exporta a WebP con calidad 82** y respeta exactamente el nombre de archivo de cada ficha. Colocalas en `public/images/<pagina>/`.
6. **Hoja de contacto antes de integrar.** Monta todas en una sola hoja de 6x6 y mirala al 25 %. Si alguna salta, regenerala. Ninguna imagen se juzga aislada.

### Checklist por imagen

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
| 6 | `home-iandrea-phone-plate` | Home | Apoyo de seccion | 4:3 | 1600x1200 | B |
| 7 | `home-extension-qr-room` | Home | Apoyo de seccion | 16:9 | 2400x1350 | A |
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

#### 5. `home-profile-especializado-proyecto`

- **Archivo:** `public/images/home/home-profile-especializado-proyecto.webp`
- **Donde va:** Home / acordeón de perfiles, panel Proyecto Especializado
- **Rol:** Apoyo de seccion
- **Tamano:** 1400 x 1050 px (4:3)
- **Bloque de estilo:** B
- **Alt (ya redactado):** Rack de red con un único módulo nuevo integrado entre equipos existentes

```text
A close night photograph of a well-organised server rack in the technical room of a small hotel, where most of the equipment is older and slightly dusty but perfectly cabled, and exactly one module in the middle is visibly newer, cleaner and brighter, with a row of electric cyan #009FE3 link lights. Everything else is deep navy and near-black, lit only by the equipment LEDs. The point of the photograph is that only one piece was replaced: the rest keeps working. No people, no labels, no lettering. This is the one image in the series with no person in it, and it should feel like the quiet inside of the building.
```

#### 6. `home-iandrea-phone-plate`  **← ANCLA DE ESTILO, generar primero**

- **Archivo:** `public/images/home/home-iandrea-phone-plate.webp`
- **Donde va:** Home / bloque iAndrea, columna derecha. Sección navy, así que la foto entra por gradación B y se recorta con `rounded-shield`.
- **Rol:** Apoyo de seccion
- **Tamano:** 1600 x 1200 px (4:3)
- **Bloque de estilo:** B
- **Zona segura:** El teléfono manda y va en el tercio inferior. Su pantalla NO debe leerse: girada lo justo para que no se distinga nada, porque cualquier interfaz o rótulo generado sale en jerigonza. La mitad superior queda oscura y sin detalle.
- **Alt (ya redactado):** Mostrador de recepción vacío de noche con el teléfono atendiendo una llamada

```text
A night-time photograph of the reception desk of a small independent European hotel at one in the morning, with nobody behind it. We look along the counter from the guest side at eye level, close enough that a slim black IP desk phone sitting on the dark stone counter is the clear subject, placed in the lower third of the frame. The phone is in the middle of a call and it is handling that call entirely on its own: the handset is still resting in its cradle, the speaker grille and the keypad are softly backlit, and two small indicator lights glow electric cyan #009FE3, one of them the active-line light. Its small display is lit and spills a soft cyan wash across the stone counter and up the wooden panel behind it, but the display is angled just far enough away from the lens that absolutely nothing on it can be read. Behind the counter the staff chair is empty and pushed back at an angle with a cardigan left over the backrest, and the wooden key wall is in deep shadow. Further back, the glazed entrance shows an empty wet street at night with two distant cool streetlights. Everything else is near-black #1D1D1B and deep navy #003057, lit only by the phone, one dimmed picture light and the street outside. Nobody is anywhere in the frame and no other light source competes with the phone. The photograph has to say one thing without needing a caption: the call is being answered, and there is no one there answering it. Do not add any robot, mascot, humanoid figure, chat bubble, speech bubble, sound-wave or waveform graphic, circuit-board pattern, glowing network diagram or holographic overlay of any kind - the only thing in this image that suggests intelligence is a telephone working a call by itself in an empty room. Restrained, quiet, faintly uncanny: the hotel running itself on the night shift.
```

#### 7. `home-extension-qr-room`

- **Archivo:** `public/images/home/home-extension-qr-room.webp`
- **Donde va:** Home / bloque Extensión Dinámica, cabecera de la columna visual. Ratio 16:9 para que la sección completa quepa en una pantalla.
- **Rol:** Apoyo de seccion
- **Tamano:** 2400 x 1350 px (16:9)
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

