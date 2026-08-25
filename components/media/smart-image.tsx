import Image from "next/image";

import { BrandArc } from "@/components/brand/brand-arc";
import { BLUR_PLACEHOLDER, getImage, type ImageKey } from "@/content/images";
import { cn } from "@/lib/utils/cn";

/**
 * La pieza que permite montar la web antes de que existan las fotos.
 *
 * Con `ready: false` pinta un hueco con el aspect-ratio EXACTO del asset y, en
 * mono, el nombre del fichero que falta. Consecuencias:
 * - el layout es identico con y sin foto, asi que al sustituirla el CLS es 0;
 * - el cliente ve literalmente como debe llamarse cada archivo;
 * - `next/image` nunca apunta a un `src` local inexistente, que en Next reventaria
 *   la peticion.
 *
 * `sizes` no se improvisa: se pasa uno de los patrones de abajo.
 */

export const SIZES = {
  /** Hero a sangre completa. Solo el hero de la home lleva `priority`. */
  heroFull: "100vw",
  /** Media de hero partido (columna de ~42vw en escritorio). */
  heroSplit: "(min-width: 1024px) 42vw, 100vw",
  /** Tarjeta en rejilla de 2 columnas. */
  grid2: "(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw",
  /** Tarjeta en rejilla de 3 o 4 columnas. */
  grid3: "(min-width: 1024px) 300px, 50vw",
  /** Miniatura. */
  thumb: "96px",
} as const;

type SmartImageProps = {
  image: ImageKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Clases del contenedor: aqui van `d-crop-r`, `rounded-shield`, etc. */
  wrapperClassName?: string;
  /** Cuando la imagen es puramente decorativa, se fuerza alt vacio. */
  decorative?: boolean;
};

export function SmartImage({
  image,
  sizes = SIZES.grid2,
  priority = false,
  className,
  wrapperClassName,
  decorative = false,
}: SmartImageProps) {
  const asset = getImage(image);
  const ratio = `${asset.width} / ${asset.height}`;

  if (!asset.ready) {
    return (
      <div
        className={cn(
          "bg-brand-gradient-soft relative isolate flex items-end overflow-hidden border border-line",
          wrapperClassName,
        )}
        style={{ aspectRatio: ratio }}
        // Es un hueco de produccion pendiente, no contenido: no debe anunciarse.
        aria-hidden="true"
      >
        <BrandArc
          placement="edge"
          tone="gradient"
          opacity={0.35}
          className="inset-y-0 right-0 h-full w-16"
        />
        <div className="relative w-full p-4">
          <p className="font-mono text-[11px] leading-relaxed text-fg-muted">
            <span className="block tracking-[0.14em] uppercase opacity-60">
              imagen pendiente
            </span>
            <span className="mt-1 block break-all">{asset.src}</span>
            <span className="mt-0.5 block opacity-60" data-tabular>
              {asset.width} x {asset.height} &middot; grading {asset.grading}
              {asset.plate ? " · plancha" : ""}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", wrapperClassName)}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={asset.src}
        alt={decorative ? "" : asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        className={cn("size-full object-cover", className)}
      />
    </div>
  );
}
