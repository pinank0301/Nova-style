
import type { ClothingItem } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface ClothingCardProps {
  item: ClothingItem;
}

export function ClothingCard({ item }: ClothingCardProps) {
  return (
    <Card className="group overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 border-transparent hover:border-primary/50 h-full flex flex-col bg-card hover:bg-card/90">
      <CardHeader className="p-0 relative aspect-[3/4] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={400}
          height={533}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          data-ai-hint={item.dataAiHint || "fashion clothing"}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm" asChild className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
            <Link href={`/product/${item.id}`}>
              <Eye className="mr-2 h-4 w-4" /> Quick View
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate text-foreground group-hover:text-primary transition-colors">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground truncate">{item.category}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 pb-4 px-4">
        {item.price && <p className="text-md font-bold text-primary">{item.price}</p>}
        <Button variant="outline" size="sm" className="border-primary/50 text-primary/80 hover:bg-primary hover:text-primary-foreground transition-colors">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
