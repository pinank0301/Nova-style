
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative text-foreground min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-black bg-[radial-gradient(ellipse_200%_50%_at_50%_0%,hsl(var(--hero-glow-purple)/0.45)_0%,transparent_70%)]">
      {/* The radial gradient uses an ellipse 200% wide and 50% tall, centered at the top middle. 
          This ensures the --hero-glow-purple (with 0.45 opacity) starts at 0% (center) 
          and fades to transparent by 70% of this large radius, creating an end-to-end screen effect. */}
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block">NovaStyle:</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-fuchsia-500 animate-background-pan">
            Redefine Your Style.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-10">
          Experience the future of fashion with our immersive virtual try-on and AI-powered style recommendations. Discover pieces that truly express you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover-glow-primary">
            <Link href="/#shop">
              Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-lg hover:shadow-accent/40 transition-all duration-300 ease-in-out transform hover:scale-105">
            <Link href="/#try-on">
              Virtual Try-On <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
