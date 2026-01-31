import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cyber',
});

export const metadata = {
  title: 'Saad Naanaiy | Full Stack · Cybersecurity · System Admin · AI',
  description:
    'Portfolio of Saad Naanaiy — Full Stack Developer, Cybersecurity & System Administration Engineering student, AI enthusiast. Higher School of Technology.',
  keywords: [
    'Full Stack',
    'Cybersecurity',
    'System Administration',
    'AI',
    'Software Engineering',
    'Next.js',
    'Credly',
  ],
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
    <html className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#0a0e17" />
      </head>
      <body
        className={`${jetbrainsMono.className} scroll-smooth leading-8 overflow-x-hidden dark:bg-cyber-dark dark:text-slate-100 bg-slate-50`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
