
import { HeroSection } from '@/components/landing/hero-section';
import { ClothingShowcase } from '@/components/landing/clothing-showcase';
import { VirtualTryOnSection } from '@/components/landing/virtual-try-on-section';
import { StyleRecommendationsSection } from '@/components/landing/style-recommendations-section';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Truck, MessageSquareHeart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const WhyChooseUsFeatures = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: "Quality Guaranteed",
    description: "We source only the finest materials and ensure top-notch craftsmanship for every piece.",
  },
  {
    icon: <Truck className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: "Fast & Free Shipping",
    description: "Get your favorite styles delivered to your doorstep quickly and without extra charges on orders over $50.",
  },
  {
    icon: <MessageSquareHeart className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: "Exceptional Support",
    description: "Our dedicated customer support team is here to help you with any questions or concerns.",
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <HeroSection />
      <ClothingShowcase />
      <VirtualTryOnSection />
      <StyleRecommendationsSection />
      
      <SectionWrapper className="bg-background">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Why Shop With NovaStyle?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Experience a new era of online fashion shopping.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {WhyChooseUsFeatures.map(feature => (
            <div key={feature.title} className="group p-6 rounded-lg shadow-md bg-card/70 backdrop-blur-sm hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-primary/50 border border-transparent">
              {feature.icon}
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Elevate Your Wardrobe Today?</h2>
          <p className="max-w-xl mx-auto text-lg text-foreground/90 mb-8">
            Step into a world of personalized fashion. Explore curated collections and find pieces that truly resonate with your unique style.
          </p>
          <Button asChild size="lg" variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/#shop">
              Start Shopping Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
}
