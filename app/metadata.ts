import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Global Data Visualization Dashboard',
  description: 'Interactive dashboard showcasing global CO2 emissions, population growth, and energy consumption data.',
  openGraph: {
    title: 'Global Data Visualization Dashboard',
    description: 'Interactive dashboard showcasing global CO2 emissions, population growth, and energy consumption data.',
    images: [
      {
        url: '/dashboard-preview.png',
        width: 1200,
        height: 630,
        alt: 'Global Data Visualization Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Data Visualization Dashboard',
    description: 'Interactive dashboard showcasing global CO2 emissions, population growth, and energy consumption data.',
    images: ['/dashboard-preview.png'],
  },
}

