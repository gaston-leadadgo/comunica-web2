"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitLead, type LeadState } from "@/app/contacto/actions";
import { Icon } from "@/components/ui/icon";
import {
  contacto,
  INTENT_PILLS,
  INTENT_PILL_OF,
  INTENT_TITLE,
  type ContactIntent,
} from "@/content/contacto";
import { routes } from "@/content/site";
import { cn } from "@/lib/utils/cn";

/**
 * Formulario de contacto.
 *
 * Es una pagina, no un modal (ver `content/contacto.ts` para el razonamiento). La
 * intencion llega por `?intent=` y de ahi salen dos cosas: el titulo del bloque y
 * la pildora preseleccionada. Once intenciones se agrupan en cinco pildoras,
 * porque un selector de once botones no lo lee nadie.
 *
 * Accesibilidad:
 * - Cada campo tiene label visible, nunca placeholder como etiqueta.
 * - El error va JUNTO al campo, referenciado con `aria-describedby`, y el campo
 *   marcado con `aria-invalid`. Un resumen arriba con `role="alert"` anuncia
 *   cuantos hay, porque quien navega con lector de pantalla necesita saber que
 *   algo ha fallado sin recorrer el formulario entero.
 * - Al enviarse con exito el foco salta al panel de confirmacion, que es una
 *   region `aria-live`.
 */

const initialState: LeadState = { status: "idle" };

export function ContactForm({ intent }: { intent: ContactIntent }) {
  const [state, action] = useActionState(submitLead, initialState);
  const [selected, setSelected] = useState<ContactIntent>(intent);
  const startedRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const c = contacto.form;

  // Marca de tiempo para el filtro de tiempo minimo. Se escribe al montar, no en
  // el render del servidor: la pagina es estatica y el sello seria el del build.
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        aria-live="polite"
        className="rounded-shield border border-line bg-paper p-8 lg:p-12"
      >
        <span className="grid size-14 place-items-center rounded-full bg-positive/10 text-positive">
          <Icon name="check-circle" size={26} />
        </span>

        <h2 className="mt-7 text-display-2">{contacto.success.title}</h2>

        <p className="measure-body mt-5 text-body text-fg-muted">
          {state.nombre ? `Gracias, ${state.nombre}. ` : ""}
          Hemos registrado tu solicitud
          {state.empresa ? ` para ${state.empresa}` : ""}.
        </p>

        <div className="mt-7 rounded-lg bg-paper-warm-2 p-5">
          <p className="font-mono text-eyebrow tracking-[0.18em] text-fg-muted uppercase">
            {contacto.success.ticketLabel}
          </p>
          <p className="mt-2 font-mono text-display-3 text-navy" data-tabular>
            {state.ticket}
          </p>
        </div>

        <div className="mt-7 border-t border-line pt-6">
          <p className="flex items-center gap-2 font-mono text-eyebrow tracking-[0.18em] text-cyan-ink-strong uppercase">
            <Icon name="shield-check" size={15} />
            {contacto.success.commitmentLabel}
          </p>
          <p className="measure-body mt-3 text-body-sm text-fg-muted">
            {contacto.success.commitment}
          </p>
        </div>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const errorCount = Object.keys(errors).length;

  const field = (name: keyof typeof errors) => {
    const msgs = errors[name];
    return {
      id: `${baseId}-${name}`,
      "aria-invalid": msgs ? true : undefined,
      "aria-describedby": msgs ? `${baseId}-${name}-error` : undefined,
    };
  };

  const inputClass = (name: keyof typeof errors) =>
    cn(
      "mt-2 w-full rounded-lg border bg-paper px-4 py-3 text-body text-fg transition-colors",
      "placeholder:text-fg-muted/60",
      errors[name] ? "border-critical" : "border-line hover:border-navy/30",
    );

  return (
    <form
      action={action}
      noValidate
      className="rounded-shield border border-line bg-paper p-7 lg:p-10"
    >
      {/* Trampas anti-bot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          No rellenar
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="_t" defaultValue="" />
      <input type="hidden" name="intent" value={selected} />

      <h2 className="text-display-3">{INTENT_TITLE[selected]}</h2>

      {errorCount > 0 || (state.status === "error" && state.formError) ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-critical/40 bg-critical/[0.05] p-4"
        >
          <p className="text-body-sm font-semibold text-critical">
            {state.status === "error" && state.formError
              ? state.formError
              : `${c.errorSummary} ${errorCount}`}
          </p>
        </div>
      ) : null}

      {/* Selector de intencion */}
      <fieldset className="mt-8">
        <legend className="font-mono text-eyebrow tracking-[0.2em] text-cyan-ink-strong uppercase">
          {c.intentLabel}
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {INTENT_PILLS.map((p) => {
            const isOn = INTENT_PILL_OF[selected] === p.value;
            return (
              <button
                key={p.value}
                type="button"
                aria-pressed={isOn}
                onClick={() => setSelected(p.value)}
                className={cn(
                  "rounded-full px-4 py-2.5 text-body-sm font-semibold transition-colors",
                  isOn
                    ? "bg-navy text-white"
                    : "border border-line text-navy hover:border-navy",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={field("nombre").id} className="text-body-sm font-semibold">
            {c.fields.nombre.label} <span aria-hidden="true">*</span>
          </label>
          <input
            {...field("nombre")}
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder={c.fields.nombre.placeholder}
            className={inputClass("nombre")}
          />
          <FieldError id={`${baseId}-nombre-error`} msgs={errors.nombre} />
        </div>

        <div>
          <label htmlFor={field("email").id} className="text-body-sm font-semibold">
            {c.fields.email.label} <span aria-hidden="true">*</span>
          </label>
          <input
            {...field("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={c.fields.email.placeholder}
            className={inputClass("email")}
          />
          <FieldError id={`${baseId}-email-error`} msgs={errors.email} />
        </div>

        <div>
          <label htmlFor={field("telefono").id} className="text-body-sm font-semibold">
            {c.fields.telefono.label} <span aria-hidden="true">*</span>
          </label>
          <input
            {...field("telefono")}
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            placeholder={c.fields.telefono.placeholder}
            className={inputClass("telefono")}
          />
          <FieldError id={`${baseId}-telefono-error`} msgs={errors.telefono} />
        </div>

        <div>
          <label htmlFor={field("empresa").id} className="text-body-sm font-semibold">
            {c.fields.empresa.label} <span aria-hidden="true">*</span>
          </label>
          <input
            {...field("empresa")}
            name="empresa"
            type="text"
            required
            autoComplete="organization"
            placeholder={c.fields.empresa.placeholder}
            className={inputClass("empresa")}
          />
          <FieldError id={`${baseId}-empresa-error`} msgs={errors.empresa} />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={field("dimension").id} className="text-body-sm font-semibold">
          {c.fields.dimension.label}
        </label>
        <p className="mt-1 text-small text-fg-muted">{c.fields.dimension.hint}</p>
        <input
          {...field("dimension")}
          name="dimension"
          type="text"
          placeholder={c.fields.dimension.placeholder}
          className={inputClass("dimension")}
        />
        <FieldError id={`${baseId}-dimension-error`} msgs={errors.dimension} />
      </div>

      {/* Zona de factura: solo cuando la intencion es revisar factura */}
      {INTENT_PILL_OF[selected] === "factura" ? (
        <div className="mt-6 rounded-lg border border-dashed border-cyan/40 bg-brand-gradient-soft p-5">
          <p className="flex items-center gap-2 text-body-sm font-semibold text-navy">
            <Icon name="file-text" size={16} className="text-cyan-ink" />
            {contacto.form.invoice.label}
            <span className="font-mono text-[0.6875rem] font-normal text-fg-muted uppercase">
              {contacto.form.invoice.optional}
            </span>
          </p>
          <p className="measure-body mt-2 text-small text-fg-muted">
            {contacto.form.invoice.hint}
          </p>
          <p className="measure-body mt-3 text-small text-navy">
            {contacto.form.invoice.pending}
          </p>
        </div>
      ) : null}

      <div className="mt-6">
        <label htmlFor={field("mensaje").id} className="text-body-sm font-semibold">
          {c.fields.mensaje.label}
        </label>
        <textarea
          {...field("mensaje")}
          name="mensaje"
          rows={4}
          placeholder={c.fields.mensaje.placeholder}
          className={cn(inputClass("mensaje"), "resize-y")}
        />
        <FieldError id={`${baseId}-mensaje-error`} msgs={errors.mensaje} />
      </div>

      {/* Consentimiento */}
      <div className="mt-8 border-t border-line pt-6">
        <label className="flex items-start gap-3 text-body-sm">
          <input
            {...field("consent")}
            name="consent"
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 accent-navy"
          />
          <span>
            {c.consent.before}{" "}
            <Link
              href={routes.privacidad}
              className="text-cyan-ink underline underline-offset-2"
            >
              {c.consent.linkLabel}
            </Link>
            {c.consent.after}
          </span>
        </label>
        <FieldError id={`${baseId}-consent-error`} msgs={errors.consent} />
        <p className="measure-body mt-3 text-small text-fg-muted">
          {c.consent.note}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[0.6875rem] text-fg-muted uppercase">
          {c.requiredNote}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}

/**
 * Mensaje de error de un campo. Vive a nivel de modulo, no dentro de
 * `ContactForm`: un componente declarado durante el render se recrea en cada
 * pasada y React lo trata como un tipo nuevo, perdiendo su estado. Aqui no hay
 * estado que perder, pero la regla es correcta y el lint la exige.
 */
function FieldError({ id, msgs }: { id: string; msgs?: string[] }) {
  if (!msgs?.length) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-small text-critical">
      <Icon name="info" size={14} className="mt-0.5 shrink-0" />
      {msgs[0]}
    </p>
  );
}

/**
 * El boton vive en su propio componente porque `useFormStatus` solo lee el estado
 * del formulario si esta DENTRO del `<form>`, no en el componente que lo renderiza.
 */
function SubmitButton() {
  const { pending } = useFormStatus();
  const c = contacto.form;

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "group/btn relative inline-flex h-13 items-center justify-center gap-2 overflow-hidden rounded-full px-7",
        "bg-navy text-body font-semibold text-white",
        "before:absolute before:inset-0 before:z-0 before:bg-brand-gradient",
        "before:origin-left before:scale-x-0 before:transition-transform before:duration-[240ms] before:ease-out-expo",
        "hover:before:scale-x-100 disabled:pointer-events-none disabled:opacity-60",
      )}
    >
      <span className="relative z-10">{pending ? c.submitting : c.submit}</span>
      <span aria-hidden="true" className="relative z-10">
        {pending ? (
          <span className="block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <Icon name="arrow-right" size={17} />
        )}
      </span>
    </button>
  );
}
