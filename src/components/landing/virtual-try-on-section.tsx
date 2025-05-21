
'use client';

import { useState, type ChangeEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Shirt, RefreshCw } from 'lucide-react';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Progress } from '@/components/ui/progress'; // Import Progress

export function VirtualTryOnSection() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userImageFile, setUserImageFile] = useState<File | null>(null); // Retain file for potential future use
  const [triedOnImage, setTriedOnImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUserImageFile(file); // Store the file
      
      // Revoke previous object URL if exists to prevent memory leaks
      if (userImage && userImage.startsWith('blob:')) {
        URL.revokeObjectURL(userImage);
      }
      setUserImage(URL.createObjectURL(file));
      setTriedOnImage(null); // Reset tried on image
      setProgress(0); // Reset progress
    }
  };

  const handleTryOn = () => {
    if (userImage) {
      setIsLoading(true);
      setProgress(0);
      setTriedOnImage(null);

      // Simulate API call and progress for virtual try-on
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
          // For mock, we just set triedOnImage to be the userImage.
          // In a real scenario, this would be the processed image.
          setTriedOnImage(userImage); 
          setIsLoading(false);
        }
      }, 150); // Update progress every 150ms
    }
  };
  
  // Clean up object URLs on component unmount
  useEffect(() => {
    return () => {
      if (userImage && userImage.startsWith('blob:')) {
        URL.revokeObjectURL(userImage);
      }
      if (triedOnImage && triedOnImage.startsWith('blob:')) { // Though triedOnImage is same as userImage in mock
         URL.revokeObjectURL(triedOnImage);
      }
    };
  }, [userImage, triedOnImage]);

  const handleReset = () => {
    if (userImage && userImage.startsWith('blob:')) {
      URL.revokeObjectURL(userImage);
    }
    setUserImage(null);
    setUserImageFile(null);
    setTriedOnImage(null);
    setIsLoading(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const sampleClothingImageUrl = "https://placehold.co/300x400.png";

  return (
    <SectionWrapper id="try-on" className="bg-card">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">See It On, Virtually</h2>
        <p className="mt-4 text-lg text-muted-foreground">Upload your photo and try on our latest collection from anywhere.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <UploadCloud className="mr-2 h-6 w-6 text-primary" />
              Upload Your Photo
            </CardTitle>
            <CardDescription>Choose a clear, front-facing photo for the best results.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              ref={fileInputRef}
              className="text-foreground file:text-primary file:font-semibold file:mr-2 file:px-3 file:py-1 file:rounded-full file:border-0 file:bg-primary/10 hover:file:bg-primary/20 transition-colors" 
            />
            {userImage && (
              <div className="mt-4 p-2 border border-dashed border-border rounded-md aspect-[3/4] max-h-[400px] mx-auto relative overflow-hidden">
                <Image src={userImage} alt="User upload" layout="fill" objectFit="contain" className="rounded-md" />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleTryOn} disabled={!userImage || isLoading} className="w-full shadow-lg hover:shadow-primary/40">
                {isLoading ? 'Processing...' : 'Try On Selected Item'}
              </Button>
              {userImage && (
                <Button onClick={handleReset} variant="outline" size="icon" aria-label="Reset Image" className="shrink-0">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
            {isLoading && <Progress value={progress} className="w-full h-2 mt-2" />}
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-card/80 backdrop-blur-sm min-h-[400px] md:min-h-full"> {/* Ensure consistent height */}
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Shirt className="mr-2 h-6 w-6 text-primary" />
              Your Virtual Look
            </CardTitle>
            <CardDescription>Preview how our clothes fit your style.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full">
            {triedOnImage ? (
              <div className="p-2 border border-dashed border-border rounded-md aspect-[3/4] max-h-[400px] mx-auto relative bg-muted/30 overflow-hidden animate-in fade-in-0 duration-500">
                <Image src={triedOnImage} alt="User with tried on clothing" layout="fill" objectFit="contain" className="rounded-md" />
                {/* Mock overlay of clothing */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <Image src={sampleClothingImageUrl} alt="Clothing item overlay" width={150} height={200} className="opacity-70 drop-shadow-lg" data-ai-hint="clothing item"/>
                </div>
              </div>
            ) : (
              <div className="aspect-[3/4] max-h-[400px] w-full max-w-[300px] mx-auto flex flex-col items-center justify-center bg-muted/30 rounded-md text-muted-foreground p-4">
                <Shirt className="h-16 w-16 mb-4" />
                <p className="text-center">{isLoading ? 'Generating your look...' : 'Your try-on result will appear here.'}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
