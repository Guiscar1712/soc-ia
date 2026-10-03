"use client";

import { useMotionValue } from "motion/react";
import { DotField } from "./dot-field";
import { cluster } from "./shapes";

function buildCloud(w: number, h: number, mobile: boolean) {
  return [cluster(mobile ? 900 : 1800, w * 0.5, h * 0.42, Math.max(w, h) * 0.75)];
}

/** Mesma nuvem de pontos do hero da landing, parada no estado "caos", como fundo de tela. */
export function DotsCloud({ className = "opacity-60" }: { className?: string }) {
  const progress = useMotionValue(0);
  return (
    <DotField
      build={buildCloud}
      progress={progress}
      className={`pointer-events-none fixed inset-0 h-full w-full ${className}`}
    />
  );
}
