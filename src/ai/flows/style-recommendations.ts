
// This is an AI-generated file. Do not edit.
'use server';
/**
 * @fileOverview An AI agent that recommends complementary clothing items based on a given item.
 *
 * - getStyleRecommendations - A function that returns style recommendations for a given clothing item.
 * - StyleRecommendationsInput - The input type for the getStyleRecommendations function.
 * - StyleRecommendationsOutput - The return type for the getStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleRecommendationsInputSchema = z.object({
  clothingItemDescription: z
    .string()
    .describe('A description of the clothing item the user has tried on.'),
  userStylePreferences: z
    .string()
    .optional()
    .describe('Optional: The user’s style preferences.'),
});
export type StyleRecommendationsInput = z.infer<typeof StyleRecommendationsInputSchema>;

const RecommendedItemSchema = z.object({
  name: z.string().describe('The name of the recommended clothing item.'),
  description: z.string().describe('A brief description of the recommended clothing item.'),
  imageUrl: z.string().describe("A placeholder image URL for the item, e.g., 'https://placehold.co/300x400.png'. Must be a valid URL string."),
  dataAiHint: z.string().optional().describe('One or two keywords for the placeholder image (e.g., "silver necklace", "leather boots"). Max two words.'),
});

const StyleRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendedItemSchema)
    .describe('A list of complementary clothing items, each with a name, description, imageUrl, and dataAiHint.'),
});
export type StyleRecommendationsOutput = z.infer<typeof StyleRecommendationsOutputSchema>;

export async function getStyleRecommendations(input: StyleRecommendationsInput): Promise<StyleRecommendationsOutput> {
  return styleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleRecommendationsPrompt',
  input: {schema: StyleRecommendationsInputSchema},
  output: {schema: StyleRecommendationsOutputSchema},
  prompt: `You are a personal stylist helping users create complete outfits.

  The user has tried on the following clothing item:
  {{{clothingItemDescription}}}

  {{#if userStylePreferences}}
  The user has the following style preferences:
  {{{userStylePreferences}}}
  {{/if}}

  Recommend three complementary clothing items to complete the outfit.
  For each item, you must provide:
  1.  A "name" (e.g., "Classic Leather Belt").
  2.  A "description" (e.g., "A timeless leather belt to accentuate the waist.").
  3.  An "imageUrl" using the format 'https://placehold.co/300x400.png'.
  4.  A "dataAiHint" (e.g., "leather belt", "silk scarf") which are 1-2 relevant keywords for the placeholder image. Maximum two words for dataAiHint.

  Your response MUST be a JSON object that strictly adheres to the output schema provided to you.
  The main key in the JSON object should be "recommendations", containing an array of the recommended items.
  Ensure the 'dataAiHint' contains no more than two words.
  `,
});

const styleRecommendationsFlow = ai.defineFlow(
  {
    name: 'styleRecommendationsFlow',
    inputSchema: StyleRecommendationsInputSchema,
    outputSchema: StyleRecommendationsOutputSchema,
  },
  async input => {
    const {output, usage} = await prompt(input);
    if (!output?.recommendations) {
      console.error('AI did not return the expected recommendations structure. Usage:', usage);
      return { recommendations: [] };
    }
    // Ensure dataAiHint does not exceed two words
    const processedRecommendations = output.recommendations.map(item => ({
      ...item,
      dataAiHint: item.dataAiHint ? item.dataAiHint.split(' ').slice(0, 2).join(' ') : undefined,
    }));
    return { recommendations: processedRecommendations };
  }
);

