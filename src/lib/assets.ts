/** CDN público (Supabase Storage — bucket marketing) */
const CDN =
  "https://ptzzkubcmzqcofohqbst.supabase.co/storage/v1/object/public/marketing";

export const assets = {
  heroVideo: `${CDN}/caixa-preta-clean.mp4`,
  // poster leve fica no Vercel até subir no bucket
  heroPoster: "/images/hero-poster.jpg",
  nathalia: `${CDN}/nathalia-fava.jpg`,
  nathaliaCard: `${CDN}/nathalia-fava-card.jpg`,
} as const;
