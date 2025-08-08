import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React from "react";

export const metadata = {
  title: 'Projeto ELO | Capacitação, Carreira e Comunidade',
  description: 'O ELO é um ecossistema que conecta pessoas a oportunidades de desenvolvimento, trabalho, empreendedorismo e propósito.',
  openGraph: {
    title: 'Projeto ELO',
    description: 'Capacitação, Carreira, Trabalho e Comunidade.',
    url: 'https://projetoelo.org', // ou o domínio real
    siteName: 'Projeto ELO',
    images: [
      {
        url: 'https://projetoelo.org/og-image.jpg', // imagem real hospedada
        width: 1200,
        height: 630,
        alt: 'Logo Projeto ELO com fundo azul profundo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projeto ELO',
    description: 'Capacitação, Carreira, Trabalho e Comunidade.',
    images: ['https://projetoelo.org/og-image.jpg'],
  },
};


export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
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