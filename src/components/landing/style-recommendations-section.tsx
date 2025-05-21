'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getStyleRecommendations, type StyleRecommendationsInput } from '@/ai/flows/style-recommendations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Wand2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SectionWrapper } from '@/components/shared/section-wrapper';

const formSchema = z.object({
  clothingItemDescription: z.string().min(10, { message: 'Please describe the clothing item (min. 10 characters).' }),
  userStylePreferences: z.string().optional(),
});

export function StyleRecommendationsSection() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
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
      toast({
        title: "Style advice ready!",
        description: "We've found some complementary items for you.",
        variant: "default",
      });
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
    <SectionWrapper id="recommendations" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">AI-Powered Style Advice</h2>
        <p className="mt-4 text-lg text-muted-foreground">Let our AI stylist help you complete your look.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
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
                      <FormLabel>Clothing Item Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A black silk evening dress with thin straps" {...field} rows={4} />
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
                      <FormLabel>Your Style Preferences (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., minimalist, chic, comfortable" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Thinking...' : 'Get Recommendations'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-xl min-h-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="mr-2 h-6 w-6 text-primary" />
              Our Suggestions
            </CardTitle>
            <CardDescription>Complementary items to perfect your outfit.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && <p className="text-muted-foreground">Our AI stylist is curating your recommendations...</p>}
            {!isLoading && recommendations.length === 0 && (
              <p className="text-muted-foreground">Recommendations will appear here once you submit an item.</p>
            )}
            {!isLoading && recommendations.length > 0 && (
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="p-3 bg-muted rounded-md text-foreground text-sm shadow-sm">
                    {rec}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
