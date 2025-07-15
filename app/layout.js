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
};

export default function RootLayout({ children }) {
  return (
    <html style={{ filter: 'saturate(1.3)' }}>
      <body
        className={`${outfit.className} ${ovo.className} scroll-smooth antialiased leading-8 overflow-x-hidden dark:bg-darkThem dark:text-white`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
