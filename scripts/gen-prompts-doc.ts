/**
 * Genera docs/PROMPTS-IMAGENES.md desde content/images.ts.
 *
 * El documento que usa el cliente y el codigo que referencia los archivos salen
 * de la misma fuente, asi que no pueden desincronizarse. Se ejecuta con:
 *   npm run images:doc
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import {
  ANCHOR_SUFFIX,
  HOUSE_STYLE,
  STYLE_ANCHORS,
  images,
  type ImageAsset,
} from "../content/images";

const ROLE_LABEL: Record<ImageAsset["role"], string> = {
  hero: "Hero de pagina",
  apoyo: "Apoyo de seccion",
  mockup: "Mockup de producto",
  textura: "Textura de fondo",
  bodegon: "Bodegon editorial",
  retrato: "Retrato",
  og: "Plancha Open Graph",
};

const GROUPS: { id: string; title: string }[] = [
  { id: "home", title: "Home" },
  { id: "soluciones", title: "Soluciones" },
  { id: "nosotros", title: "Nosotros" },
  { id: "partners", title: "Partners" },
  { id: "contacto", title: "Contacto" },
  { id: "og", title: "Open Graph" },
];

const all = Object.values(images) as ImageAsset[];

function groupOf(asset: ImageAsset): string {
  return asset.src.split("/")[2] ?? "otros";
}

const lines: string[] = [];
const w = (s = "") => lines.push(s);

w("# Comunica - Prompts de imagenes para Nano Banana / Gemini");
w();
w(
  `Generado automaticamente desde \`content/images.ts\`. **No editar a mano**: cambia el registro y vuelve a ejecutar \`npm run images:doc\`.`,
);
w();
w(`**${all.length} imagenes** en total.`);
w();
w("---");
w();

// ---------------------------------------------------------------- Instrucciones
w("## Direccion de arte");
w();
w(
  "El publico objetivo son **dueños y gestores de hoteles pequeños**. Las imagenes tienen que mostrar a esas personas en su propio hotel, y equilibrar hoteleria y tecnologia. Las tres reglas que resuelven la tension entre \"web de telco\" y \"web de hotel\":",
);
w();
w(
  "1. **La persona es un hotelero trabajando, no un modelo.** Cuarenta a sesenta años, ropa real de trabajo, manos ocupadas, pillado a media tarea. **Nunca mirando a camara.**",
);
w(
  "2. **Una señal hotelera evidente y una señal tecnica pequeña.** La tecnologia es siempre incidental: un punto de estado, un telefono IP, un punto de acceso en el techo. Si la tecnologia es el sujeto, parece una telco; si no aparece, parece un hotel.",
);
w(
  "3. **Veto de imagineria vacacional.** Nada de piscinas, playas, atardeceres, copas, parejas de vacaciones ni suites de revista. Es el negocio visto desde dentro, en horas muertas.",
);
w();
w("---");
w();
w("## Como usar este documento");
w();
w(
  "Cada generacion es **[PROMPT ESPECIFICO] + [BLOQUE DE ESTILO]**, pegados uno detras del otro. Cada ficha indica que bloque le toca: **A** (lado huesped, secciones claras), **B** (lado tecnico, secciones oscuras) o **C** (imagen de producto de iAndrea).",
);
w();
w(
  "**El bloque C es la excepcion deliberada de todo el documento.** Las reglas de direccion de arte de arriba describen la serie fotografica, donde la tecnologia es incidental para que la web no parezca de una telco. En el bloque que explica que es iAndrea esa regla juega en contra: quien llega ahi quiere ver el producto. La gradacion C es abiertamente tecnologica —interfaz de voz luminosa, ondas, burbujas de conversacion, iconos conectados— y esta alineada con las creatividades que iAndrea ya usa en campaña. **A las imagenes C no se les aplican las tres reglas ni el checklist de la serie**, solo la paleta de marca y la prohibicion de texto.",
);
w();
w(
  "El bloque de estilo se pega **literal, sin editar ni resumir**. Cualquier reescritura introduce deriva y la serie deja de parecer del mismo fotografo.",
);
w();
w("### Orden de trabajo, importa");
w();
w(
  `1. **Genera primero las dos anclas** y solo esas: \`${STYLE_ANCHORS[0]}\` (bloque A) y \`${STYLE_ANCHORS[1]}\` (bloque B). Iteralas hasta que el grading sea exactamente el que quieres. Guardalas como \`_style-anchor-light.png\` y \`_style-anchor-dark.png\`, **fuera** de la carpeta del proyecto. Es la unica decision irreversible de todo el bloque de imagenes.`,
);
w(
  "2. **Adjunta el ancla correspondiente en todas las generaciones siguientes** y anade esta frase al final del prompt, despues del bloque de estilo:",
);
w();
w("   > " + ANCHOR_SUFFIX);
w();
w(
  "3. **Una sola sesion de chat por bloque.** Todas las A en un hilo, todas las B en otro. Gemini no expone semillas numericas: el contexto de la conversacion es tu semilla, y mantenerlo es lo que evita que la serie se disperse.",
);
w(
  "4. **Normalizacion final en lote, obligatoria.** Aunque salgan bien, pasa las imagenes por el mismo ajuste antes de exportar: una curva identica que fije el punto negro en `#1D1D1B`, el blanco en `#FAFAF8` y un split-toning que empuje las sombras a `#003057`. Esto es lo que unifica de verdad; el resto es aproximacion.",
);
w(
  "5. **Exporta a WebP con calidad 82** y respeta exactamente el nombre de archivo de cada ficha. Colocalas en `public/images/<pagina>/`.",
);
w(
  "6. **Hoja de contacto antes de integrar.** Monta todas en una sola hoja de 6x6 y mirala al 25 %. Si alguna salta, regenerala. Ninguna imagen se juzga aislada.",
);
w();
w("### Checklist por imagen (solo bloques A y B)");
w();
w("- Tiene **exactamente un** acento cyan, y existe fisicamente en la escena.");
w("- **Nadie** mira a camara, y nadie sonrie a camara.");
w(
  "- Si hay persona: **parece un hotelero trabajando**, no un modelo. Ropa real, manos ocupadas, a media tarea.",
);
w(
  "- Hay una **señal hotelera evidente** (mostrador, llave, carro de gobernanta, cama hecha) y la tecnologia es **incidental**.",
);
w("- **Cero** imagineria vacacional: ni piscina, ni playa, ni atardecer, ni copas.");
w("- **No hay** texto, letras, numeros, logos ni marcas de agua dentro.");
w("- La zona segura esta **realmente vacia**, no solo poco cargada.");
w();
w(
  "### Sobre las planchas (fichas marcadas como *plancha*)",
);
w();
w(
  "Nano Banana no escribe texto legible: un dashboard generado por IA con palabras dentro produce jerigonza y mata la credibilidad ante un director de IT hotelero. Por eso, en las planchas el prompt pide **la pantalla en navy plano, sin contenido, sin reflejos y sin distorsion**. La interfaz real se compone despues por CSS sobre la foto.",
);
w();
w("---");
w();

// ------------------------------------------------------------- Indice
w("## Indice");
w();
w("| # | Archivo | Pagina | Rol | Ratio | Px | Bloque |");
w("|---|---|---|---|---|---|---|");
let n = 0;
for (const g of GROUPS) {
  for (const a of all.filter((x) => groupOf(x) === g.id)) {
    n += 1;
    const ratio = simplifyRatio(a.width, a.height);
    w(
      `| ${n} | \`${a.key}\` | ${g.title} | ${ROLE_LABEL[a.role]} | ${ratio} | ${a.width}x${a.height} | ${a.grading}${a.plate ? " · plancha" : ""} |`,
    );
  }
}
w();
w("---");
w();

// -------------------------------------------------------- Bloques de estilo
w("## Bloques de estilo");
w();
w("### Bloque A - lado huesped (secciones claras)");
w();
w("```text");
w(HOUSE_STYLE.A);
w("```");
w();
w("### Bloque B - lado tecnico (secciones oscuras)");
w();
w("```text");
w(HOUSE_STYLE.B);
w("```");
w();
w("### Bloque C - imagen de producto de iAndrea");
w();
w(
  "Solo para la ficha de iAndrea. Aqui la tecnologia **es** el sujeto, a proposito. No se combina con los bloques A ni B.",
);
w();
w("```text");
w(HOUSE_STYLE.C);
w("```");
w();
w("---");
w();

// ------------------------------------------------------------- Fichas
w("## Fichas");
w();
n = 0;
for (const g of GROUPS) {
  const group = all.filter((x) => groupOf(x) === g.id);
  if (!group.length) continue;
  w(`### ${g.title} (${group.length})`);
  w();
  for (const a of group) {
    n += 1;
    const isAnchor = (STYLE_ANCHORS as readonly string[]).includes(a.key);
    w(`#### ${n}. \`${a.key}\`${isAnchor ? "  **← ANCLA DE ESTILO, generar primero**" : ""}`);
    w();
    w(`- **Archivo:** \`public${a.src}\``);
    w(`- **Donde va:** ${a.usage}`);
    w(`- **Rol:** ${ROLE_LABEL[a.role]}`);
    w(
      `- **Tamano:** ${a.width} x ${a.height} px (${simplifyRatio(a.width, a.height)})`,
    );
    w(`- **Bloque de estilo:** ${a.grading}`);
    if (a.plate) {
      w(
        `- **Plancha Tier B:** la pantalla debe salir en navy plano y sin contenido. La interfaz real se compone encima por CSS.`,
      );
    }
    if (a.safeArea) w(`- **Zona segura:** ${a.safeArea}`);
    if (a.alt) w(`- **Alt (ya redactado):** ${a.alt}`);
    w();
    w("```text");
    w(a.prompt);
    w("```");
    w();
  }
  w("---");
  w();
}

function simplifyRatio(a: number, b: number): string {
  const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
  const d = gcd(a, b);
  let rw = a / d;
  let rh = b / d;
  // Normaliza a proporciones legibles cuando el gcd deja numeros grandes
  if (rw > 32 || rh > 32) {
    const r = a / b;
    const common: [number, number][] = [
      [1, 1], [4, 3], [3, 2], [16, 9], [16, 10], [21, 9], [8, 3], [4, 5], [2, 3], [40, 21],
    ];
    let best = common[0];
    let bestErr = Infinity;
    for (const c of common) {
      const err = Math.abs(c[0] / c[1] - r);
      if (err < bestErr) {
        bestErr = err;
        best = c;
      }
    }
    [rw, rh] = best;
  }
  return `${rw}:${rh}`;
}

const out = resolve(process.cwd(), "docs/PROMPTS-IMAGENES.md");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, lines.join("\n") + "\n", "utf8");
console.log(`docs/PROMPTS-IMAGENES.md generado: ${all.length} imagenes, ${lines.length} lineas.`);
