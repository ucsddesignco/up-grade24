import { Metadata } from 'next';
import './styles/global.scss';
import localFont from 'next/font/local';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://upgrade24.ucsddesign.co/'),
  title: 'UP-GRADE 2024: Design Co',
  description: `UP-Grade is a 10-week summer internship-style program where students will get the opportunity to work alongside a local, nonprofit organization to elevate their branding and boost their exposure within the community.`,
  keywords:
    'Design Co, Design at UCSD, UCSD, UC San Diego, design, summer program, nonprofit',
  openGraph: {
    title: 'UP-GRADE 2024: Design Co',
    description: `UP-Grade is a 10-week summer internship-style program where students will get the opportunity to work alongside a local, nonprofit organization to elevate their branding and boost their exposure within the community.`,
    images: '/opengraph-image.png',
    url: 'https://upgrade24.ucsddesign.co/',
    siteName: 'UP-GRADE 2024: Design Co',
    locale: 'en_US',
    type: 'website'
  }
};

const Aspekta = localFont({
  src: '../../public/fonts/Aspekta-400.woff2',
  variable: '--font-aspekta',
  display: 'swap'
});

const UncutSansMedium = localFont({
  src: '../../public/fonts/UncutSans-Medium.woff2',
  variable: '--font-uncutsans-medium',
  display: 'swap'
});

const UncutSansSemiBold = localFont({
  src: '../../public/fonts/UncutSans-Semibold.woff2',
  variable: '--font-uncutsans-semibold',
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Aspekta.variable} ${UncutSansMedium.variable} ${UncutSansSemiBold.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
