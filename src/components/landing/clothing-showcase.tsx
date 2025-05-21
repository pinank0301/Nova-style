
import type { ClothingItem } from '@/types';
import { ClothingCard } from './clothing-card';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Sparkles } from 'lucide-react';

const sampleItems: ClothingItem[] = [
  { id: '1', name: 'Flowy Maxi Dress', description: 'Elegant dress for special occasions.', price: '$120', imageUrl: 'https://placehold.co/400x533.png', category: 'Dresses', dataAiHint: 'maxi dress' },
  { id: '2', name: 'Urban Denim Jacket', description: 'Versatile jacket for a casual look.', price: '$85', imageUrl: 'https://placehold.co/400x533.png', category: 'Jackets', dataAiHint: 'denim jacket' },
  { id: '3', name: 'Silk Blend Blouse', description: 'Luxurious blouse for work or evening.', price: '$70', imageUrl: 'https://placehold.co/400x533.png', category: 'Tops', dataAiHint: 'silk blouse' },
  { id: '4', name: 'Tailored Chinos', description: 'Comfortable and stylish chinos.', price: '$60', imageUrl: 'https://placehold.co/400x533.png', category: 'Pants', dataAiHint: 'chinos men' },
];

export function ClothingShowcase() {
  return (
    <SectionWrapper id="shop" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
         <Sparkles className="inline-block h-8 w-8 text-primary mr-2 animate-pulse animation-delay-500" />
          Curated Collection
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">Discover handpicked styles for every occasion.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {sampleItems.map(item => (
          <ClothingCard key={item.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}

