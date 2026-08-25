# Hero isométrico — prompt de generación

Referencia: `public/images/hero-1.png`.
Destino: ChatGPT (GPT Image), que sí rotula bien.

**Qué entra en la imagen:** el edificio, el rótulo HOTEL, las cinco etiquetas
flotantes de la derecha (WiFi, Voz, IPTV, Conectividad, IA), la píldora "Todo
bajo control" y la caja con la marca COMUNICA.

**Qué NO entra:** solo el bloque de texto de la izquierda —titular, subtítulo,
botones y la fila de "350 hoteles · 13 países"— porque eso ya lo pinta la web
encima. Ese tercio izquierdo tiene que quedar vacío.

---

## Prompt

> A polished isometric architectural cutaway illustration of a modern five-storey
> boutique hotel, presented like an open dollhouse cross-section so that every
> floor is visible at once. Photorealistic 3D render, crisp and clean, on a pure
> white background with a soft contact shadow under the building.
>
> **Composition.** 16:9 landscape. The hotel occupies the centre-right of the
> frame, seen from a raised three-quarter isometric angle. **The entire left
> third of the image must remain completely empty white space — no building, no
> objects, no text, nothing.** A column of floating labels runs down the right
> edge.
>
> **The floors, bottom to top.**
> Ground floor: a technical room with slim black server racks and patch panels,
> their status lights glowing cyan.
> First floor: a meeting room with a long table and chairs, plus a small open
> workspace.
> Second floor: a restaurant with laid tables, warm pendant lamps and a bar.
> Third floor: the reception lobby — a long dark stone counter with a
> receptionist standing behind it, a lounge with sofas and armchairs, potted
> plants, and a wall-mounted digital screen.
> Top floor: three guest bedrooms, each with a made bed, bedside lamps and a
> wall-mounted flat-screen television.
>
> **The network.** A slim, luminous cyan cable runs vertically through the core of
> the building and branches along the ceilings into every floor, like a nervous
> system made of light. All branches sweep downward and converge into a single
> rounded white device that floats just below the building, glowing cyan from
> within.
>
> **Text inside the image — render these exactly, spelled correctly, in a clean
> modern geometric sans-serif.**
> On the roof, a dark rectangular sign panel mounted on a frame reads **HOTEL** in
> warm cream capitals, with a row of five small gold stars beneath the word.
> On the top face of the floating white device, the word **COMUNICA** in dark navy
> capitals with generous letter-spacing, sitting beneath a simple cyan circular
> emblem.
> Above the entrance canopy at street level, a small dark sign reads **HOTEL** in
> small cream capitals.
>
> **Floating labels down the right edge.** Five separate white rounded-rectangle
> pills, evenly stacked and slightly offset from one another, each with a soft
> drop shadow, a small cyan line-art icon on the left and a short dark-navy label
> on the right. From top to bottom they read exactly:
> **WiFi** (wi-fi arc icon), **Voz** (telephone handset icon), **IPTV** (monitor
> icon), **Conectividad** (connected-nodes icon), **IA** (brain icon).
> A thin cyan connector line links each pill back to the corresponding floor of
> the building.
>
> Below the building, one more white rounded pill with a soft shadow, containing a
> small green circular check icon followed by the words **Todo bajo control** in
> dark navy.
>
> All text must be correctly spelled Spanish, sharp and perfectly legible. No
> invented letters, no duplicated or garbled words, no lorem ipsum.
>
> **Street level.** A small entrance canopy, three steps, clipped hedges in
> planters, two slim trees, and one dark grey saloon car parked at the kerb.
>
> **Colour.** Predominantly white, warm off-white and pale grey architecture, warm
> amber interior lighting inside the rooms, and a single saturated accent —
> electric cyan #009FE3 — reserved for the cables, the device glow, the icons and
> the server status lights. Deep navy #003057 for text and the darkest shadows.
> No other saturated colour anywhere.
>
> Crisp, high detail, soft even studio lighting, subtle ambient occlusion, no
> depth-of-field blur, no harsh shadows.
>
> Do not add any headline, paragraph, button, statistic or navigation bar. Do not
> place any text in the left third. No people other than the single receptionist.
> No world map, no globe, no dotted network mesh, no hexagons, no circuit-board
> pattern, no lens flares, no watermark.

---

## Especificaciones del archivo

| Dato | Valor |
|---|---|
| Nombre | `home-hero-isometric-cutaway.webp` |
| Ubicación | `public/images/home/` |
| Ratio | 16:9 |
| Maestro | 2560 × 1440 px |
| Exportar | WebP calidad 82 |
| Zona segura | tercio izquierdo completamente vacío |

---

## Si algún rótulo sale mal

Aunque GPT Image rotula bien, conviene revisar palabra por palabra: **Conectividad**
es la más larga y la que más se resiste. Si alguna sale con una letra de más o de
menos, hay dos caminos:

1. Reintentar solo esa zona con edición por región.
2. Pedir la imagen con esa píldora vacía y montar el texto en HTML encima. Si
   eliges esto, dímelo y te la compongo: se vería más nítida y además sería
   traducible.

---

## Nota de dirección de arte

Este corte isométrico con cables luminosos es un recurso muy extendido en el
sector telco: gana mucho en claridad —se ve de un vistazo todo lo que Comunica
toca dentro de un hotel— y pierde en diferenciación frente a la línea fotográfica
del resto del sitio.

Es tu decisión y la respeto. Solo una recomendación práctica: si se adopta,
conviene que las demás imágenes de la home sigan siendo fotografía real. Mezclar
más ilustración 3D en otras secciones sí terminaría de acercar el conjunto al
aspecto de catálogo de operador.
