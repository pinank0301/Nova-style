import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Assuming Geist is preferred over Geist_Sans
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

const geist = Geist({ // Using Geist variable font
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aetheria - Redefine Your Style',
  description: 'Experience the future of fashion with virtual try-on and AI-powered style recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Apply dark class to html for consistent dark theme */}
      <body className={`${geist.variable} font-sans antialiased bg-background text-foreground`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
