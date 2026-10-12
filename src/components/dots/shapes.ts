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

type DocSlot = { x: number; y: number; rot: number; scale: number };

// Posições em múltiplos de meia aresta do cubo, relativas ao centro dele.
const DOCS_DESKTOP: DocSlot[] = [
  { x: -2.7, y: 0.2, rot: -0.07, scale: 1 },
  { x: -1.75, y: -0.75, rot: -0.12, scale: 0.78 },
  { x: 1.75, y: -0.8, rot: 0.1, scale: 0.78 },
  { x: 2.7, y: 0.15, rot: 0.06, scale: 1 },
];
const DOCS_MOBILE: DocSlot[] = [
  { x: -1.2, y: -1.3, rot: -0.12, scale: 0.66 },
  { x: 1.2, y: -1.35, rot: 0.1, scale: 0.66 },
];

function smooth(x: number) {
  const k = Math.min(Math.max(x, 0), 1);
  return k * k * (3 - 2 * k);
}

function easeOut(x: number) {
  const k = Math.min(Math.max(x, 0), 1);
  return 1 - Math.pow(1 - k, 3);
}

// passa um pouco do ponto e volta: a folha "assenta" ao chegar
function easeOutBack(x: number) {
  const k = Math.min(Math.max(x, 0), 1);
  const c = 1.4;
  return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
}

type DocDot = { u: number; v: number; tone: number; size: number; alpha: number };

/**
 * Desenho de uma folha em pontos alinhados, como impressão matricial:
 * borda contínua, faixa de título em bronze e linhas de texto regulares.
 * Usa exatamente `count` pontos.
 */
function docTemplate(count: number, seed: number): DocDot[] {
  const rnd = rand(seed);
  const dots: DocDot[] = [];
  const ROWS = 7;
  const rowLen = Array.from({ length: ROWS }, (_, r) => (r === ROWS - 1 ? 0.45 : 0.62 + rnd() * 0.3));
  const header = { cols: 14, rows: 2 };
  const textBudget = Math.round(count * 0.42);
  const outline = Math.max(count - header.cols * header.rows - textBudget, 24);

  // borda: pontos espaçados por igual no perímetro (proporção da folha 0.95 × 1.25)
  const W = 0.95;
  const H = 1.25;
  const per = 2 * (W + H);
  for (let i = 0; i < outline; i++) {
    let d = (i / outline) * per;
    let u: number;
    let v: number;
    if (d < W) [u, v] = [d / W - 0.5, -0.5];
    else if ((d -= W) < H) [u, v] = [0.5, d / H - 0.5];
    else if ((d -= H) < W) [u, v] = [0.5 - d / W, 0.5];
    else [u, v] = [-0.5, 0.5 - (d - W) / H];
    dots.push({ u, v, tone: 0.55, size: 1.15, alpha: 0.9 });
  }

  // faixa de título em grade
  for (let r = 0; r < header.rows; r++)
    for (let c = 0; c < header.cols; c++)
      dots.push({
        u: -0.36 + (c / (header.cols - 1)) * 0.72,
        v: -0.38 + r * 0.05,
        tone: 1,
        size: 1.35,
        alpha: 1,
      });

  // linhas de texto: pontos no mesmo espaçamento em todas as linhas
  const total = rowLen.reduce((a, b) => a + b, 0);
  let used = 0;
  rowLen.forEach((len, r) => {
    const k = r === ROWS - 1 ? textBudget - used : Math.round((len / total) * textBudget);
    used += k;
    for (let c = 0; c < k; c++)
      dots.push({
        u: -0.36 + (k === 1 ? 0 : (c / (k - 1)) * 0.72 * len),
        v: -0.18 + r * 0.088,
        tone: r === 0 ? 0.7 : 0.5,
        size: 0.95,
        alpha: r === 0 ? 0.9 : 0.7,
      });
  });

  return dots.slice(0, count);
}

/**
 * A Caixa Preta com documentos saindo dela. Parte dos pontos do cubo vira
 * folhas (borda, faixa de título em bronze e linhas de texto). `open` (0 → 1)
 * conduz a saída: cada folha se monta dentro da caixa, sobe pela abertura
 * em arco e voa até o seu lugar, uma depois da outra.
 */
export function cubeWithDocs(
  n: number,
  cx: number,
  cy: number,
  size: number,
  mobile: boolean,
  open: () => number,
): Shape {
  const s = cube(n, cx, cy, size);
  const cubeUpdate = s.update!;
  const half = size / 2;
  const slots = mobile ? DOCS_MOBILE : DOCS_DESKTOP;
  const m = Math.round(n * 0.4);
  const per = Math.ceil(m / slots.length);
  // ordem de saída: as folhas de dentro primeiro, depois as de fora
  const order = mobile ? [0, 1] : [1, 2, 0, 3];
  const STAGGER_DOC = 0.14;
  const RUN = 1 - STAGGER_DOC * (slots.length - 1);
  const mouth = { x: cx, y: cy - half * 0.85 };

  // Coordenadas locais da folha, de -0.5 a 0.5 nos dois eixos.
  const u = new Float32Array(m);
  const v = new Float32Array(m);
  const slot = new Uint8Array(m);
  const tone = new Float32Array(m);
  const dot = new Float32Array(m);
  const alpha = new Float32Array(m);

  slots.forEach((_, d) => {
    const start = d * per;
    const count = Math.max(Math.min(per, m - start), 0);
    docTemplate(count, 53 + d).forEach((p, k) => {
      const i = start + k;
      slot[i] = d;
      u[i] = p.u;
      v[i] = p.v;
      tone[i] = p.tone;
      dot[i] = p.size;
      alpha[i] = p.alpha;
    });
  });

  // pose de cada folha no frame atual
  const pose = slots.map(() => ({ x: 0, y: 0, rot: 0, scale: 0, form: 0, glow: 0 }));

  s.update = (t: number) => {
    cubeUpdate(t);
    const o = Math.min(Math.max(open(), 0), 1);

    slots.forEach((d, j) => {
      const q = Math.min(Math.max((o - order.indexOf(j) * STAGGER_DOC) / RUN, 0), 1);
      const form = smooth(q / 0.3); // monta dentro da caixa
      const fly = easeOut((q - 0.3) / 0.7); // sai e voa até o lugar
      const float = fly * Math.sin(t * 0.0009 + j * 2.1) * half * 0.04;
      const tx = cx + d.x * half;
      const ty = cy + d.y * half;
      const p = pose[j];
      p.form = form;
      p.x = mouth.x + (tx - mouth.x) * fly;
      // arco: sobe acima da abertura antes de descer até o lugar
      p.y = mouth.y + (ty - mouth.y) * fly - Math.sin(Math.PI * fly) * half * 0.9 + float;
      p.scale = 0.45 + (d.scale - 0.45) * easeOutBack((q - 0.3) / 0.7);
      // brilho curto quando a folha assenta
      p.glow = Math.sin(Math.PI * Math.min(Math.max((q - 0.82) / 0.18, 0), 1));
      p.rot = d.rot * fly + Math.sin(Math.PI * fly) * d.rot * 0.8 + fly * Math.sin(t * 0.0006 + j * 1.7) * 0.03;
    });

    for (let i = 0; i < m; i++) {
      const p = pose[slot[i]];
      if (p.form <= 0) continue; // ainda é parte do cubo
      const w = half * 0.95 * p.scale;
      const h = half * 1.25 * p.scale;
      const px = u[i] * w;
      const py = v[i] * h;
      const c = Math.cos(p.rot);
      const sn = Math.sin(p.rot);
      const dx = p.x + px * c - py * sn;
      const dy = p.y + px * sn + py * c;
      const k = p.form;
      s.xy[i * 2] += (dx - s.xy[i * 2]) * k;
      s.xy[i * 2 + 1] += (dy - s.xy[i * 2 + 1]) * k;
      s.tone[i] += (tone[i] - s.tone[i]) * k;
      s.size[i] += (dot[i] - s.size[i]) * k;
      s.alpha[i] += (alpha[i] - s.alpha[i]) * k;
      if (p.glow > 0) {
        s.tone[i] += (1 - s.tone[i]) * p.glow * 0.35;
        s.size[i] *= 1 + p.glow * 0.25;
      }
    }
  };
  s.update(0);
  return s;
}
