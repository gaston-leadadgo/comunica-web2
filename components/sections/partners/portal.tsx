"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { partners } from "@/content/partners";
import { useBrandMotion } from "@/lib/gsap/use-brand-motion";

/**
 * Acceso al portal de partners.
 *
 * Aqui hay una diferencia deliberada con la demo, y conviene que quede escrita:
 * el prototipo abre un modal de login que marca la sesion como valida con
 * CUALQUIER email y CUALQUIER contrasena. Publicar eso es peor que no tener
 * portal. Un partner real introduciria sus credenciales de verdad en un formulario
 * que no autentica nada y que, ademas, ensena a los suyos a teclear la contrasena
 * en cualquier caja parecida.
 *
 * Hasta que el cliente diga contra que se autentica, este bloque anuncia el portal
 * y ofrece el camino que si funciona. Cuando exista backend, esto pasa a ser un
 * enlace a `/partners/acceso` y el copy `pending` desaparece.
 */
export function PartnersPortal() {
  const { portal } = partners;

  const scope = useBrandMotion<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    gsap.from(scope, {
      opacity: 0,
      y: 20,
      duration: 0.55,
      ease: "power3.out",
      immediateRender: true,
      scrollTrigger: { trigger: scope, start: "top 85%", once: true },
    });
  });

  return (
    <section id="portal" data-tone="light" className="bg-paper py-section-sm">
      <Container>
        <div
          ref={scope}
          className="rounded-shield mx-auto flex max-w-[46rem] flex-col items-center gap-5 border border-line bg-paper-warm-2 p-8 text-center lg:p-10"
        >
          <span className="grid size-12 place-items-center rounded-full bg-navy/[0.06] text-navy">
            <Icon name="shield-check" size={22} />
          </span>

          <p className="text-display-3">{portal.prompt}</p>

          <p className="measure-lead text-body-sm text-fg-muted">
            {portal.pending}
          </p>

          <Button
            href={portal.cta.href}
            variant="outline"
            iconRight={<Icon name="arrow-right" size={17} />}
          >
            {portal.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
