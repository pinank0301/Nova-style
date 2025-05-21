export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  price?: string; // Price is optional for landing page display
  imageUrl: string;
  category: string;
  dataAiHint?: string; // For placeholder image generation
}
