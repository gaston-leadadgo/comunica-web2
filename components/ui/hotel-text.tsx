import { Fragment } from "react";

/**
 * Resalta "tu hotel" alla donde aparezca en el copy.
 *
 * Peticion de cliente: la expresion es el eje del posicionamiento (Comunica no
 * vende telecomunicaciones, resuelve TU hotel), asi que se destaca cada vez que
 * sale, en toda la web.
 *
 * Se resuelve en presentacion y no en el copy: `content/*.ts` sigue siendo texto
 * plano serializable —sin JSX, sin `<strong>` incrustado— que es lo que permite
 * validarlo, reutilizarlo entre paginas y, si algun dia hace falta, traducirlo.
 * Meter el marcado en el contenido romperia las tres cosas.
 *
 * El estilo (`.mark-hotel`, en globals.css) NO cambia el color del texto: pone
 * un trazo cyan bajo la linea base. Es lo que permite usarlo indistintamente en
 * un titular oscuro sobre blanco, en un parrafo apagado o sobre el degradado del
 * CTA de cierre sin perder contraste en ninguno.
 *
 * La UNICA excepcion es `variant="accent"`, reservada al titular del hero: ahi
 * el fondo es conocido y el cliente pide que la expresion iguale el cyan de la
 * segunda linea, con el trazo dibujandose al entrar. Es una variante explicita y
 * no el comportamiento por defecto justamente para que el resto de la web siga
 * siendo seguro sobre cualquier fondo.
 */

/**
 * Grupo de captura para que `split` devuelva tambien las coincidencias.
 * `\s+` y no un espacio literal: el copy puede traer un salto de linea en medio.
 * Sin la bandera `g` en la constante que se reutiliza — `split` la aplica igual y
 * asi no se arrastra `lastIndex` entre llamadas.
 */
const TU_HOTEL = String.raw`\btu\s+hotel\b`;

/**
 * `underline` es el trazo cyan que no toca el color, valido sobre cualquier
 * fondo. `accent` colorea el texto en `--color-cyan-strong` y dibuja el trazo al
 * entrar: solo para el titular del hero, sobre papel.
 */
export type MarkVariant = "underline" | "accent";

/** Escapa los metacaracteres para poder pasar frases literales como patron. */
function escapeRegExp(literal: string) {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Reparte el texto en trozos alternos y envuelve las coincidencias.
 *
 * Con grupo de captura, `split` intercala texto y coincidencias: los indices
 * impares son SIEMPRE las coincidencias. Es lo que evita volver a probar el
 * patron sobre cada trozo (y el `lastIndex` que eso arrastraria con la bandera
 * global).
 */
function markUp(text: string, pattern: string, variant: MarkVariant) {
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));

  if (parts.length === 1) return <>{text}</>;

  const className =
    variant === "accent" ? "mark-hotel mark-hotel-accent" : "mark-hotel";

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className={className}>
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Resalta "tu hotel" en cualquier cadena de copy. */
export function HotelText({
  children,
  variant = "underline",
}: {
  children: string;
  variant?: MarkVariant;
}) {
  return markUp(children, TU_HOTEL, variant);
}

/**
 * Resalta una frase concreta con el mismo trazo de marca. Para los enfasis
 * puntuales que no son "tu hotel" (por ejemplo "nuestra diferencia").
 */
export function MarkPhrase({
  children,
  phrase,
  variant = "underline",
}: {
  children: string;
  phrase: string;
  variant?: MarkVariant;
}) {
  return markUp(children, escapeRegExp(phrase), variant);
}
