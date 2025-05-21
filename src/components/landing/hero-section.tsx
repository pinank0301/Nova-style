
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react'; // Import Star icon
import Link from 'next/link';

export function HeroSection() {
  const stars = [
    { size: 'w-2 h-2', top: '10%', left: '15%', delay: '0s' }, // Slightly larger for icon visibility
    { size: 'w-1 h-1', top: '20%', left: '80%', delay: '0.5s' },
    { size: 'w-2 h-2', top: '30%', left: '5%', delay: '1s' },
    { size: 'w-1 h-1', top: '40%', left: '60%', delay: '1.5s' },
    { size: 'w-2 h-2', top: '50%', left: '25%', delay: '0.2s' },
    { size: 'w-1 h-1', top: '65%', left: '90%', delay: '0.7s' },
    { size: 'w-1 h-1', top: '80%', left: '50%', delay: '1.2s' },
    { size: 'w-2 h-2', top: '15%', left: '40%', delay: '0.3s' },
    { size: 'w-1 h-1', top: '5%', left: '70%', delay: '0.8s' },
    { size: 'w-2 h-2', top: '85%', left: '10%', delay: '0.6s' },
    { size: 'w-1 h-1', top: '90%', left: '65%', delay: '1.1s' },
  ];

  return (
    <section className="relative bg-black text-foreground min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_200%_35%_at_50%_0%,hsl(var(--hero-glow-purple)/0.45)_0%,transparent_70%)]">
      
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star, index) => (
          <Star
            key={index}
            fill="currentColor"
            className={`absolute text-slate-400 animate-twinkle ${star.size}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 text-center z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block">NovaStyle:</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-fuchsia-500 animate-background-pan">
            Ignite Your Presence.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80 mb-10">
          Step into a universe where fashion meets innovation. Virtually try on iconic looks, receive AI-powered styling, and curate a wardrobe that's uniquely you.
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
