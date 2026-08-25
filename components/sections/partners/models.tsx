"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { partners } from "@/content/partners";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";
import { cn } from "@/lib/utils/cn";

/**
 * La oportunidad y los dos modelos de colaboracion.
 *
 * Las tres salidas del copy ("puedes rechazarlo / puedes enviarlo a otra empresa /
 * o puedes tener a Comunica detras") van como tres celdas en fila, con las dos
 * primeras atenuadas y la tercera en navy. La composicion hace el argumento sola:
 * hay tres puertas y solo una esta encendida.
 *
 * Los dos modelos son tarjetas grandes con un reparto "tu / nosotros" al pie. Ese
 * reparto es literal del copy y es lo que un partner quiere saber antes que nada:
 * quien se queda con la relacion con el cliente.
 */
export function PartnersModels() {
  const { opportunity, models } = partners;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    gsap.from(gsap.utils.toArray("[data-reveal]", scope), {
      opacity: 0,
      y: 22,
      duration: 0.6,
      ease: "power3.out",
      immediateRender: true,
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 82%", once: true },
    });
    const doors = gsap.utils.toArray<HTMLElement>("[data-door]", scope);
    if (doors.length) {
      gsap.from(doors, {
        opacity: 0,
        y: 18,
        duration: 0.5,
        ease: "power2.out",
        immediateRender: true,
        stagger: 0.08,
        scrollTrigger: { trigger: doors[0], start: "top 85%", once: true },
      });
    }
    const cards = gsap.utils.toArray<HTMLElement>("[data-model]", scope);
    if (cards.length) {
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        immediateRender: true,
        stagger: 0.12,
        scrollTrigger: { trigger: cards[0], start: "top 85%", once: true },
      });
    }
  });

  return (
    <section id="modelos" data-tone="light" className="bg-paper py-section">
      <Container width="wide">
      <div ref={scope}>
        {/* La oportunidad */}
        <div data-reveal className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <h2 className="max-w-[20ch] text-display-2 text-balance">
            {opportunity.title}
          </h2>
          <p className="measure-body text-body text-fg-muted">{opportunity.lead}</p>
        </div>

        {/* Las tres salidas: solo la tercera esta encendida */}
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-3">
          {opportunity.options.map((o, i) => {
            const isGood = i === opportunity.options.length - 1;
            return (
              <li
                key={o}
                data-door
                className={cn(
                  "flex min-w-0 items-center gap-3 p-7",
                  isGood ? "bg-navy text-white" : "bg-paper-warm text-fg-muted",
                )}
              >
                <Icon
                  name={isGood ? "check-circle" : "x"}
                  size={18}
                  className={cn("shrink-0", isGood ? "text-cyan" : "text-fg-muted/60")}
                />
                <span
                  className={cn(
                    "text-card-title",
                    isGood ? "text-white" : "text-fg-muted",
                  )}
                >
                  {o}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Los dos modelos */}
        <h2 data-reveal className="mt-20 text-display-2">{models.title}</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {models.items.map((m) => (
            <article
              key={m.id}
              data-model
              className={cn(
                "rounded-shield flex flex-col justify-between gap-8 p-8 lg:p-10",
                m.featured
                  ? "bg-brand-gradient-soft border border-cyan/30"
                  : "border border-line bg-paper-warm",
              )}
            >
              <div className="min-w-0">
                <h3 className="text-display-3 text-navy">{m.name}</h3>
                <p className="measure-body mt-3 text-card-title">{m.claim}</p>

                <div className="mt-7 flex flex-col gap-3.5">
                  {m.body.map((p) => (
                    <p key={p} className="measure-body text-body-sm text-fg-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                {/* El reparto: quien aporta que */}
                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
                  <p className="min-w-0 bg-paper p-4 text-body-sm font-semibold text-navy">
                    {m.split.yours}
                  </p>
                  <p className="min-w-0 bg-navy p-4 text-body-sm font-semibold text-white">
                    {m.split.ours}
                  </p>
                </div>

                <div className="mt-7">
                  <Button
                    href={m.cta.href}
                    variant="navy"
                    iconRight={<Icon name="arrow-right" size={17} />}
                    className="w-full sm:w-auto"
                  >
                    {m.cta.label}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      </Container>
    </section>
  );
}
