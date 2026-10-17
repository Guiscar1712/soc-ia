import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Caixa Preta SÓC.IA | Tire o padrão do escritório da sua cabeça",
  description:
    "Ferramentas de IA e processos de exemplo para registrar suas rotinas e criar materiais que você revisa e reutiliza.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Caixa Preta SÓC.IA | Tire o padrão do escritório da sua cabeça",
    description:
      "Ferramentas de IA e processos de exemplo para registrar suas rotinas e criar materiais que você revisa e reutiliza.",
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
    title: "Caixa Preta SÓC.IA | Tire o padrão do escritório da sua cabeça",
    description:
      "Ferramentas de IA e processos de exemplo para registrar suas rotinas e criar materiais que você revisa e reutiliza.",
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
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`var socValue={"/":97,"/b":97,"/skill-gratuita":67}[location.pathname];if(socValue){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '4243110902615033');
fbq('track', 'PageView');
fbq('track', 'ViewContent', {content_name: 'Caixa Preta SOC.IA', value: socValue, currency: 'BRL'});}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
