import type { ReactNode } from "react";

import { Container } from "@/components/ui/section";

/**
 * Marco comun de las paginas legales: una sola columna estrecha, sin adornos.
 * Un aviso legal no se maqueta, se lee.
 */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main
      id="main"
      className="w-full max-w-full overflow-x-hidden bg-paper pt-[calc(var(--header-h)+clamp(2.5rem,6vw,4rem))] pb-section"
    >
      <Container width="narrow">
        <div className="legal-prose">{children}</div>
      </Container>
    </main>
  );
}
