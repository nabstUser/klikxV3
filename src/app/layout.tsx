import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: "Klikx - Vos visuels, votre meilleur argument",
  description: "Des visuels 3D réalistes et percutants pour valoriser vos espaces",
  icons: {
    icon: [
      { url: '/favicon.svg' },
    ],
    apple: [
      { url: '/apple-icon.svg' },
    ],
  },
  manifest: '/site.webmanifest',
  // Ajout des métadonnées OpenGraph et Twitter pour un meilleur partage sur les réseaux sociaux
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://klikx.agency/',
    title: 'Klikx - Vos visuels, votre meilleur argument',
    description: 'Modélisation 3D isométrique réaliste pour Airbnb et conciergeries.',
    siteName: 'Klikx',
    images: [
      {
        url: 'https://klikx.agency/heroSection.jpg',
        width: 1200,
        height: 630,
        alt: 'Klikx - Rendus 3D pour Airbnb',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klikx - Vos visuels, votre meilleur argument',
    description: 'Modélisation 3D isométrique réaliste pour Airbnb et conciergeries.',
    images: ['https://klikx.agency/heroSection.jpg'],
  },
  alternates: {
    canonical: 'https://klikx.agency',
  },
  keywords: '3D, modélisation, Airbnb, conciergerie, rendus 3D, visualisation, intérieur, photographie 3D, Lausanne, Suisse',
  authors: [{ name: 'Klikx' }],
  creator: 'Klikx',
  publisher: 'Klikx',
};

// Script Schema.org JSON-LD pour le SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Klikx",
      "description": "Modélisation 3D isométrique réaliste pour Airbnb et conciergeries.",
      "url": "https://klikx.agency",
      "email": "contact@klikx.agency",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lausanne",
        "addressCountry": "CH"
      },
      "sameAs": [
        "https://www.instagram.com/klikx.agency"
      ]
    },
    {
      "@type": "Product",
      "name": "Forfait Basic - Modélisation 3D Intérieure",
      "description": "Modèle 3D isométrique simple pour studio ou T1. JPEG optimisé pour Airbnb.",
      "brand": "Klikx",
      "offers": {
        "@type": "Offer",
        "price": "249.00",
        "priceCurrency": "CHF",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "name": "Forfait Premium - Modélisation 3D Intérieure",
      "description": "Modèle 3D isométrique détaillé pour T2 ou T3. JPEG optimisé pour Airbnb.",
      "brand": "Klikx",
      "offers": {
        "@type": "Offer",
        "price": "399.00",
        "priceCurrency": "CHF",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "name": "Forfait Deluxe - Modélisation 3D Intérieure",
      "description": "Rendu ultra réaliste pour grands biens (T4, lofts). JPEG optimisé pour Airbnb + formats réseaux sociaux.",
      "brand": "Klikx",
      "offers": {
        "@type": "Offer",
        "price": "599.00",
        "priceCurrency": "CHF",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
};

// Script Google Analytics
function GoogleAnalytics() {
  // ID de mesure Google Analytics
  const measurementId = "G-WSGNN8LFRG";

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Balises meta additionnelles pour les moteurs de recherche */}
        <meta name="geo.region" content="CH-VD" />
        <meta name="geo.placename" content="Lausanne" />
        <meta name="geo.position" content="46.5196;6.6323" />
        <meta name="ICBM" content="46.5196, 6.6323" />
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
