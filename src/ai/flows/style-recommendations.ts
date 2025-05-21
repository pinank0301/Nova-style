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
    .describe('Optional: The user\u2019s style preferences.'),
});
export type StyleRecommendationsInput = z.infer<typeof StyleRecommendationsInputSchema>;

const StyleRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of complementary clothing items.'),
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
  {{clothingItemDescription}}

  {% if userStylePreferences %}
  The user has the following style preferences:
  {{userStylePreferences}}
  {% endif %}

  Recommend three complementary clothing items to complete the outfit. Return each item in a new line.
  `,
});

const styleRecommendationsFlow = ai.defineFlow(
  {
    name: 'styleRecommendationsFlow',
    inputSchema: StyleRecommendationsInputSchema,
    outputSchema: StyleRecommendationsOutputSchema,
  },
  async input => {
    const {text} = await prompt(input);
    const recommendations = text!.split('\n').map(item => item.trim());
    return {recommendations};
  }
);
