// @ts-ignore: allow side-effect css import without type declarations
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Resume Frontend',
  description: 'Resume project - homepage',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
