import type { ClothingItem } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface ClothingCardProps {
  item: ClothingItem;
}

export function ClothingCard({ item }: ClothingCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="p-0 relative aspect-[3/4]">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={400}
          height={533}
          className="object-cover w-full h-full"
          data-ai-hint={item.dataAiHint || "fashion clothing"}
        />
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate text-foreground">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground truncate">{item.category}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0 pb-4 px-4">
        {item.price && <p className="text-md font-bold text-primary">{item.price}</p>}
        <Button variant="outline" size="sm" asChild>
          <Link href={`/product/${item.id}`}>
            <Eye className="mr-2 h-4 w-4" /> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
