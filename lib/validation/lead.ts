import { z } from "zod";

import { CONTACT_INTENTS } from "@/content/contacto";

/**
 * Esquema del lead. Se comparte cliente y servidor: el mismo objeto valida al
 * salir del campo (`onBlur`) y dentro de la Server Action, asi que no puede haber
 * dos criterios distintos.
 *
 * La validacion del servidor no es opcional aunque el navegador ya valide: un
 * `required` en HTML es una sugerencia, no una garantia.
 */
export const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(120, "El nombre es demasiado largo."),

  email: z
    .string()
    .trim()
    .min(1, "Necesitamos un email para responderte.")
    .email("Ese email no parece válido.")
    .max(180, "El email es demasiado largo."),

  telefono: z
    .string()
    .trim()
    .min(6, "Necesitamos un teléfono de contacto.")
    // Digitos, espacios, guiones, parentesis y un prefijo internacional.
    .regex(/^[+()\d\s.-]{6,24}$/, "Revisa el teléfono: solo números y prefijo.")
    .max(24, "El teléfono es demasiado largo."),

  empresa: z
    .string()
    .trim()
    .min(2, "Dinos el nombre de tu hotel, cadena o empresa.")
    .max(160, "El nombre es demasiado largo."),

  /**
   * Dimension del establecimiento, texto libre. La demo lo tenia como numerico con
   * tope 100, lo que no encaja con presumir cartera de 350 hoteles ni con un grupo
   * de 40 propiedades. Texto libre acepta "65 habitaciones" y "3 propiedades", que
   * es como responde la gente.
   */
  dimension: z.string().trim().max(120, "Resume un poco más.").optional().or(z.literal("")),

  mensaje: z
    .string()
    .trim()
    .max(2000, "El mensaje es demasiado largo.")
    .optional()
    .or(z.literal("")),

  intent: z.enum(CONTACT_INTENTS),

  /** Consentimiento RGPD: sin esto no hay base legal para responder. */
  consent: z
    .string()
    .refine((v) => v === "on", "Necesitamos tu consentimiento para poder responderte."),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Errores por campo, tal como los espera el formulario. */
export type LeadFieldErrors = Partial<Record<keyof LeadInput, string[]>>;
