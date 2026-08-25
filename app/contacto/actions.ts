"use server";

import { randomUUID } from "node:crypto";

import { leadSchema, type LeadFieldErrors } from "@/lib/validation/lead";

/**
 * Server Action del formulario de contacto.
 *
 * Tres decisiones que conviene no revertir sin pensarlo:
 *
 * 1. **El identificador de solicitud se genera en el SERVIDOR.** El prototipo lo
 *    generaba con `Math.random()` durante el render del componente, lo que en RSC
 *    produce un valor distinto en servidor y cliente y rompe la hidratacion.
 * 2. **El honeypot devuelve exito falso.** Si contestaramos con un error, el bot
 *    aprende que hay una trampa y prueba otra cosa. Asi cree que ha enviado.
 * 3. **El limite por IP vive en memoria del proceso.** Sirve en un servidor Node
 *    persistente; en serverless cada instancia tiene su propio Map y el limite se
 *    diluye. Si el hosting final es Vercel hay que mover esto a un almacen
 *    compartido (Upstash o similar). Queda anotado porque es facil olvidarlo.
 */

export type LeadState =
  | { status: "idle" }
  | { status: "error"; errors: LeadFieldErrors; formError?: string }
  | { status: "success"; ticket: string; nombre: string; empresa: string };

/** Ventana de 10 minutos, 5 envios. Ver nota 3 sobre serverless. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

/** `COM-` + 6 digitos derivados de un UUID, no de Math.random(). */
function generateTicketId(): string {
  const digits = randomUUID().replace(/\D/g, "").slice(0, 6).padEnd(6, "0");
  return `COM-${digits}`;
}

/**
 * Destino del lead. Hoy solo registra en el log del servidor porque no hay
 * credenciales: falta que el cliente decida si los leads van a correo (Resend o
 * SMTP), a CRM (HubSpot, Zoho, Pipedrive) o a ambos. La interfaz esta aislada aqui
 * para que anadir el destino real sea un solo cambio.
 */
async function deliverLead(payload: Record<string, unknown>): Promise<void> {
  console.info("[lead] recibido", payload);
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  // Trampa 1: campo oculto que un humano nunca rellena.
  if ((formData.get("_hp") as string)?.trim()) {
    return { status: "success", ticket: generateTicketId(), nombre: "", empresa: "" };
  }

  // Trampa 2: tiempo minimo de cumplimentacion. El campo lo escribe el cliente al
  // montar; si viene vacio (JavaScript desactivado) no se penaliza.
  const startedAt = Number(formData.get("_t"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 2500) {
    return { status: "success", ticket: generateTicketId(), nombre: "", empresa: "" };
  }

  const parsed = leadSchema.safeParse({
    nombre: formData.get("nombre") ?? "",
    email: formData.get("email") ?? "",
    telefono: formData.get("telefono") ?? "",
    empresa: formData.get("empresa") ?? "",
    dimension: formData.get("dimension") ?? "",
    mensaje: formData.get("mensaje") ?? "",
    intent: formData.get("intent") ?? "general",
    consent: formData.get("consent") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors as LeadFieldErrors,
    };
  }

  if (rateLimited(parsed.data.email.toLowerCase())) {
    return {
      status: "error",
      errors: {},
      formError:
        "Hemos recibido varias solicitudes desde este email en los últimos minutos. Si es un error, escríbenos por teléfono.",
    };
  }

  const ticket = generateTicketId();
  await deliverLead({ ...parsed.data, ticket, receivedAt: new Date().toISOString() });

  return {
    status: "success",
    ticket,
    nombre: parsed.data.nombre,
    empresa: parsed.data.empresa,
  };
}
