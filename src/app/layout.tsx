import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title:
    "Caixa Preta SÓC.IA — Procedimentos, ferramentas e agentes de IA para o escritório",
  description:
    "Abra a caixa-preta de um escritório estruturado e tenha acesso aos procedimentos, ferramentas e agentes de IA que ajudam a transformar rotina em gestão.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Caixa Preta SÓC.IA",
    description:
      "Abra a caixa-preta de um escritório estruturado e tenha acesso aos procedimentos, ferramentas e agentes de IA que ajudam a transformar rotina em gestão.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Caixa Preta SÓC.IA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caixa Preta SÓC.IA",
    description:
      "Procedimentos, ferramentas e agentes de IA para transformar rotina em gestão.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
