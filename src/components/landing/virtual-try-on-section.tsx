'use client';

import { useState, type ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Shirt } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/section-wrapper';

export function VirtualTryOnSection() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [triedOnImage, setTriedOnImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUserImageFile(file);
      setUserImage(URL.createObjectURL(file));
      setTriedOnImage(null); // Reset tried on image when new user image is uploaded
    }
  };

  const handleTryOn = () => {
    if (userImage) {
      setIsLoading(true);
      // Simulate API call for virtual try-on
      setTimeout(() => {
        // For mock, we just set triedOnImage to be the userImage.
        // In a real scenario, this would be the processed image.
        // Here, we'll overlay a sample clothing item.
        setTriedOnImage(userImage); 
        setIsLoading(false);
      }, 1500);
    }
  };
  
  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (userImage && userImage.startsWith('blob:')) {
        URL.revokeObjectURL(userImage);
      }
      if (triedOnImage && triedOnImage.startsWith('blob:')) {
         URL.revokeObjectURL(triedOnImage);
      }
    };
  }, [userImage, triedOnImage]);

  const sampleClothingImageUrl = "https://placehold.co/300x400.png?text=Clothing+Item";

  return (
    <SectionWrapper id="try-on" className="bg-card">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">See It On, Virtually</h2>
        <p className="mt-4 text-lg text-muted-foreground">Upload your photo and try on our latest collection from anywhere.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UploadCloud className="mr-2 h-6 w-6 text-primary" />
              Upload Your Photo
            </CardTitle>
            <CardDescription>Choose a clear, front-facing photo for the best results.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="text-foreground file:text-primary file:font-semibold" />
            {userImage && (
              <div className="mt-4 p-2 border border-dashed border-border rounded-md aspect-square max-h-[400px] mx-auto relative">
                <Image src={userImage} alt="User upload" layout="fill" objectFit="contain" className="rounded-md" />
              </div>
            )}
            <Button onClick={handleTryOn} disabled={!userImage || isLoading} className="w-full">
              {isLoading ? 'Processing...' : 'Try On Selected Item'}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shirt className="mr-2 h-6 w-6 text-primary" />
              Your Virtual Look
            </CardTitle>
            <CardDescription>Preview how our clothes fit your style.</CardDescription>
          </CardHeader>
          <CardContent>
            {triedOnImage ? (
              <div className="p-2 border border-dashed border-border rounded-md aspect-square max-h-[400px] mx-auto relative bg-gray-200 dark:bg-muted">
                <Image src={triedOnImage} alt="User with tried on clothing" layout="fill" objectFit="contain" className="rounded-md" />
                {/* Mock overlay of clothing */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <Image src={sampleClothingImageUrl} alt="Clothing item overlay" width={150} height={200} className="opacity-70" data-ai-hint="fashion model"/>
                </div>
              </div>
            ) : (
              <div className="aspect-square max-h-[400px] mx-auto flex flex-col items-center justify-center bg-muted rounded-md text-muted-foreground">
                <Shirt className="h-16 w-16 mb-4" />
                <p>Your try-on result will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
