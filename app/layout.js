import { Outfit, Ovo } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const ovo = Ovo({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata = {
  title: 'Portfolio - Saad Naanaiy',
  description: 'Personal portfolio showcasing web development and design work',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html style={{ filter: 'saturate(1.3)' }}>
      <head>
        {/* Favicon links */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body
        className={`${outfit.className} ${ovo.className} scroll-smooth antialiased leading-8 overflow-x-hidden dark:bg-darkThem dark:text-white`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
