"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";
import { prefersReducedMotion } from "@/lib/scroll";
import type { Shape } from "./shapes";

type Build = (w: number, h: number, mobile: boolean) => Shape[] | Promise<Shape[]>;

// 0 = cinza quente (#7d6f61) → 0.5 = papel (#ede8e1) → 1 = bronze (#c7844a)
const STOPS = [
  [125, 111, 97],
  [237, 232, 225],
  [199, 132, 74],
];
const PALETTE = Array.from({ length: 33 }, (_, k) => {
  const t = k / 32;
  const [a, b, u] = t < 0.5 ? [STOPS[0], STOPS[1], t * 2] : [STOPS[1], STOPS[2], (t - 0.5) * 2];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * u));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
});

const STAGGER = 0.4;

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Campo de pontos em canvas. `progress` vai de 0 a (formas - 1);
 * cada ponto viaja da forma atual para a próxima com um atraso próprio.
 */
export function DotField({
  build,
  progress,
  className,
}: {
  build: Build;
  progress: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buildRef = useRef(build);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    let shapes: Shape[] = [];
    let delay = new Float32Array(0);
    let phase = new Float32Array(0);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let token = 0;

    const resize = async () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mine = ++token;
      const next = await buildRef.current(w, h, w < 768);
      if (mine !== token || !next.length) return;
      const n = next[0].tone.length;
      if (delay.length !== n) {
        delay = new Float32Array(n);
        phase = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          delay[i] = reduced ? 0 : Math.random() * STAGGER;
          phase[i] = Math.random() * Math.PI * 2;
        }
      }
      shapes = next;
    };

    const draw = (t: number) => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      const count = shapes.length;
      if (count) {
        const p = Math.min(Math.max(progress.get(), 0), count - 1);
        const seg = Math.min(Math.floor(p), count - 2);
        const local = count === 1 ? 0 : p - Math.max(seg, 0);
        const A = shapes[Math.max(seg, 0)];
        const B = shapes[Math.min(seg + 1, count - 1)];
        A.update?.(t);
        if (B !== A) B.update?.(t);
        const n = A.tone.length;
        const span = 1 - STAGGER;
        const time = reduced ? 0 : t * 0.001;

        for (let i = 0; i < n; i++) {
          const k = reduced ? local : ease(Math.min(Math.max((local - delay[i]) / span, 0), 1));
          const alpha = A.alpha[i] + (B.alpha[i] - A.alpha[i]) * k;
          if (alpha < 0.02) continue;
          const wob = (A.wobble + (B.wobble - A.wobble) * k) * (reduced ? 0 : 1);
          const x = A.xy[i * 2] + (B.xy[i * 2] - A.xy[i * 2]) * k + Math.sin(time * 0.9 + phase[i]) * wob;
          const y =
            A.xy[i * 2 + 1] + (B.xy[i * 2 + 1] - A.xy[i * 2 + 1]) * k + Math.cos(time * 0.7 + phase[i] * 1.3) * wob;
          const tone = A.tone[i] + (B.tone[i] - A.tone[i]) * k;
          const r = A.size[i] + (B.size[i] - A.size[i]) * k;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = PALETTE[Math.round(Math.min(Math.max(tone, 0), 1) * 32)];
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (visible) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => void resize());
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    void resize().then(start);

    return () => {
      token++;
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [progress]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
