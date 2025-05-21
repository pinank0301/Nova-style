import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-background to-purple-900/30 text-foreground min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Subtle background pattern or image */}
        {/* <Image src="https://placehold.co/1920x1080.png" alt="Abstract background" layout="fill" objectFit="cover" data-ai-hint="abstract pattern" /> */}
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block">Aetheria:</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent animate-background-pan">
            Redefine Your Style.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-10">
          Experience the future of fashion with our immersive virtual try-on and AI-powered style recommendations. Discover pieces that truly express you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
            <Link href="/#shop">
              Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-lg hover:shadow-accent/30 transition-shadow duration-300">
            <Link href="/#try-on">
              Virtual Try-On
            </Link>
          </Button>
        </div>
      </div>
      {/* Optional: subtle animated shapes or particles */}
    </section>
  );
}
