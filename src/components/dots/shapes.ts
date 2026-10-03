/**
 * Formas-alvo do campo de pontos. Cada forma define, para cada ponto i:
 * posição (xy), tom (0 = cinza quente, 0.5 = papel, 1 = bronze), tamanho e alpha.
 * Formas com `update` são recalculadas a cada frame (ex.: cubo girando).
 */
export type Shape = {
  xy: Float32Array;
  tone: Float32Array;
  size: Float32Array;
  alpha: Float32Array;
  wobble: number;
  update?: (t: number) => void;
};

function rand(seed: number) {
  // PRNG determinístico para o layout não "pular" entre resizes
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function empty(n: number, wobble: number): Shape {
  return {
    xy: new Float32Array(n * 2),
    tone: new Float32Array(n),
    size: new Float32Array(n),
    alpha: new Float32Array(n).fill(1),
    wobble,
  };
}

/** Nuvem gaussiana — o "caos" na cabeça do advogado. */
export function cluster(n: number, cx: number, cy: number, r: number): Shape {
  const s = empty(n, 7);
  const rnd = rand(11);
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(-2 * Math.log(rnd() + 1e-6)) * r * 0.45;
    s.xy[i * 2] = cx + Math.cos(a) * d * 1.25;
    s.xy[i * 2 + 1] = cy + Math.sin(a) * d;
    s.tone[i] = 0.45 + rnd() * 0.55;
    s.size[i] = 1.1 + rnd() * 1.1;
    s.alpha[i] = 0.55 + rnd() * 0.45;
  }
  return s;
}

/** Pontos espalhados pela tela inteira — as demandas ocupando tudo. */
export function spread(n: number, w: number, h: number): Shape {
  const s = empty(n, 3);
  const rnd = rand(23);
  for (let i = 0; i < n; i++) {
    s.xy[i * 2] = rnd() * w;
    s.xy[i * 2 + 1] = rnd() * h;
    s.tone[i] = rnd() < 0.55 ? 0.85 + rnd() * 0.15 : 0.35 + rnd() * 0.3;
    s.size[i] = 1 + rnd() * 1.2;
    s.alpha[i] = 0.35 + rnd() * 0.5;
  }
  return s;
}

/** Cubo 3D girando devagar — a Caixa Preta. Arestas em bronze, faces escuras. */
export function cube(n: number, cx: number, cy: number, size: number): Shape {
  const s = empty(n, 0);
  const rnd = rand(37);
  const local = new Float32Array(n * 3);
  const isEdge = new Uint8Array(n);
  const edges: [number, number, number, number, number, number][] = [];
  const v = [-1, 1];
  for (const a of v)
    for (const b of v) {
      edges.push([-1, a, b, 1, a, b], [a, -1, b, a, 1, b], [a, b, -1, a, b, 1]);
    }

  for (let i = 0; i < n; i++) {
    if (rnd() < 0.38) {
      const e = edges[Math.floor(rnd() * edges.length)];
      const k = rnd();
      local[i * 3] = e[0] + (e[3] - e[0]) * k;
      local[i * 3 + 1] = e[1] + (e[4] - e[1]) * k;
      local[i * 3 + 2] = e[2] + (e[5] - e[2]) * k;
      isEdge[i] = 1;
    } else {
      const axis = Math.floor(rnd() * 3);
      const side = rnd() < 0.5 ? -1 : 1;
      const p = [rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1];
      p[axis] = side;
      local.set(p, i * 3);
    }
  }

  const half = size / 2;
  const pitch = -0.52;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);

  s.update = (t: number) => {
    const yaw = 0.62 + t * 0.00018;
    const cyw = Math.cos(yaw);
    const syw = Math.sin(yaw);
    for (let i = 0; i < n; i++) {
      const x = local[i * 3];
      const y = local[i * 3 + 1];
      const z = local[i * 3 + 2];
      const x1 = x * cyw + z * syw;
      const z1 = -x * syw + z * cyw;
      const y2 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;
      const persp = 3.6 / (3.6 + z2);
      s.xy[i * 2] = cx + x1 * half * persp;
      s.xy[i * 2 + 1] = cy + y2 * half * persp;
      const depth = (1 - z2) / 2; // 1 = frente
      if (isEdge[i]) {
        s.tone[i] = 1;
        s.size[i] = 1.6 + depth * 0.9;
        s.alpha[i] = 0.35 + depth * 0.65;
      } else {
        s.tone[i] = 0.12;
        s.size[i] = 1.1;
        s.alpha[i] = 0.12 + depth * 0.4;
      }
    }
  };
  s.update(0);
  return s;
}
