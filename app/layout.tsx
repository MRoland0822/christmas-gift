import type { Metadata } from 'next';
import { Playfair_Display, Dancing_Script } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dancing = Dancing_Script({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Christmas Gift Experience 🎄',
  description: 'Open your gift and discover magical messages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dancing.variable}`}>
      <body className="bg-gradient-to-b from-slate-950 via-indigo-950 via-blue-950 to-slate-900 min-h-screen text-white overflow-x-hidden relative">
        {/* Animated gradient overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse" />
        </div>
        
        {/* Vignette effect */}
        <div className="fixed inset-0 pointer-events-none bg-radial-gradient opacity-40" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {children}
      </body>
    </html>
  );
}