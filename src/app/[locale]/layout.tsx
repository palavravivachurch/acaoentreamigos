import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import React from "react";

export const metadata = {
  title: "Ação Entre Amigos | Solidariedade e Contribuição",
  description:
    "Participe da Ação Entre Amigos e ajude a instituição Amor em Ação a transformar vidas. Contribua e concorra a uma Moto Honda CG 125!",
  openGraph: {
    title: "Ação Entre Amigos",
    description:
      "Contribua para a Amor em Ação e concorra a uma Moto Honda CG 125.",
    url: "https://aea.projetoelo.org", // ajuste para seu domínio real
    siteName: "Ação Entre Amigos",
    images: [
      {
        url: "https://aea.projetoelo.org/og-image.jpg", // imagem real do projeto
        width: 1200,
        height: 630,
        alt: "Ação Entre Amigos - Solidariedade e Prêmio Moto CG",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ação Entre Amigos",
    description:
      "Contribua para a Amor em Ação e concorra a uma Moto Honda CG 125.",
    images: ["https://acaointreiamigos.org/og-image.jpg"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
