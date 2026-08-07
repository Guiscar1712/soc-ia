import Image from "next/image";

type Variant = "dark" | "light";

const LOCKUPS = {
  dark: {
    horizontal: "/brand/lockup-horizontal-nav.png",
    stacked: "/brand/lockup-stacked-nav.png",
  },
  light: {
    horizontal: "/brand/lockup-horizontal-light-nav.png",
    stacked: "/brand/lockup-stacked-light.png",
  },
} as const;

/** Símbolo oficial extraído da assinatura. */
export function BrandMark({
  className = "h-8 w-8",
  title = "SÓC.IA",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <Image
      src="/brand/icon-mark-transparent.png"
      alt={title}
      width={169}
      height={163}
      className={className}
      priority
    />
  );
}

/** Assinatura horizontal oficial (preferencial). */
export function BrandLockup({
  className = "",
  variant = "dark",
  priority = false,
}: {
  className?: string;
  variant?: Variant;
  priority?: boolean;
}) {
  const src = LOCKUPS[variant].horizontal;
  return (
    <Image
      src={src}
      alt="Caixa Preta SÓC.IA"
      width={524}
      height={174}
      priority={priority}
      className={`h-9 w-auto md:h-10 ${className}`}
    />
  );
}

/** Assinatura vertical oficial. */
export function BrandLockupStacked({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: Variant;
}) {
  const src = LOCKUPS[variant].stacked;
  return (
    <Image
      src={src}
      alt="Caixa Preta SÓC.IA"
      width={400}
      height={360}
      className={`h-auto w-40 ${className}`}
    />
  );
}
