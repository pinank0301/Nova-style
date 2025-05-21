
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getStyleRecommendations, type StyleRecommendationsInput, type StyleRecommendationsOutput } from '@/ai/flows/style-recommendations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Wand2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import Image from 'next/image'; // Import next/image
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

const formSchema = z.object({
  clothingItemDescription: z.string().min(10, { message: 'Please describe the clothing item (min. 10 characters).' }),
  userStylePreferences: z.string().optional(),
});

type RecommendationItem = StyleRecommendationsOutput['recommendations'][0];

export function StyleRecommendationsSection() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<StyleRecommendationsInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clothingItemDescription: '',
      userStylePreferences: '',
    },
  });

  const onSubmit: SubmitHandler<StyleRecommendationsInput> = async (data) => {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await getStyleRecommendations(data);
      setRecommendations(result.recommendations);
      if (result.recommendations.length > 0) {
        toast({
          title: "Style advice ready!",
          description: "We've found some complementary items for you.",
          variant: "default",
        });
      } else {
        toast({
          title: "No specific recommendations found.",
          description: "Try adjusting your description or preferences.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error fetching style recommendations:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with our AI stylist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper id="recommendations" className="bg-gradient-to-br from-background to-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          <Sparkles className="inline-block h-8 w-8 text-primary mr-2 animate-pulse" />
          AI-Powered Style Advice
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">Let our AI stylist help you complete your look.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <Card className="shadow-xl lg:col-span-1 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Wand2 className="mr-2 h-6 w-6 text-primary" />
              Describe Your Item
            </CardTitle>
            <CardDescription>Tell us about an item you like, and we'll suggest what goes with it.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="clothingItemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Clothing Item Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A black silk evening dress with thin straps" {...field} rows={4} className="bg-input/70 focus:bg-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userStylePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Your Style Preferences (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., minimalist, chic, comfortable" {...field} className="bg-input/70 focus:bg-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full shadow-lg hover:shadow-primary/40 transition-shadow">
                  {isLoading ? 'Thinking...' : 'Get Recommendations'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <CardHeader className="px-0 md:px-2 pt-0 pb-6 md:pt-2 md:pb-8 text-center md:text-left">
             <CardTitle className="flex items-center justify-center md:justify-start text-foreground">
                <Sparkles className="mr-2 h-6 w-6 text-primary" />
                Our Suggestions
              </CardTitle>
              <CardDescription>Complementary items to perfect your outfit.</CardDescription>
          </CardHeader>
          
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="shadow-lg bg-card/70 backdrop-blur-sm">
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-[150px] w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && recommendations.length === 0 && (
             <div className="min-h-[200px] flex flex-col items-center justify-center bg-muted/50 rounded-lg p-8 text-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Recommendations will appear here once you submit an item.</p>
              </div>
          )}

          {!isLoading && recommendations.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <Card 
                  key={index} 
                  className="bg-card/70 backdrop-blur-sm shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-in fade-in-0 slide-in-from-bottom-5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-0 relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <Image
                      src={rec.imageUrl || 'https://placehold.co/300x400.png'}
                      alt={rec.name}
                      width={300}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={rec.dataAiHint || "fashion clothing"}
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-md font-semibold text-foreground mb-1 truncate">{rec.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{rec.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
