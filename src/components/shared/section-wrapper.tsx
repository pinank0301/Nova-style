import type React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  fullWidth?: boolean; // Option for edge-to-edge content within section
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  as: Tag = 'section',
  id,
  fullWidth = false,
}) => {
  return (
    <Tag id={id} className={cn('py-16 md:py-24 w-full', className)}>
      {fullWidth ? (
        children
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      )}
    </Tag>
  );
};
