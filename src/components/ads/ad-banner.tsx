"use client";

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = ''
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Only attempt to load ads on the client side
      if (typeof window !== 'undefined' && adRef.current) {
        // @ts-expect-error: window.adsbygoogle is added by the external AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Ad:', error);
    }
  }, []);

  return (
    <Card className={`overflow-hidden my-4 ${className}`}>
      <div className="ad-container text-center">
        <div ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1830337896450418"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>
        <div className="text-xs text-muted-foreground pt-1 pb-2">Advertisement</div>
      </div>
    </Card>
  );
}
