"use client";

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface BottomAdProps {
  slot: string;
  className?: string;
}

export default function BottomAd({ slot, className = '' }: BottomAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Only attempt to load ads on the client side
      if (typeof window !== 'undefined' && adRef.current) {
        // @ts-expect-error: window.adsbygoogle is added by the external AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Bottom Ad:', error);
    }
  }, []);

  return (
    <Card className={`overflow-hidden my-4 ${className} lg:hidden`}>
      <div className="ad-container text-center">
        <div ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1830337896450418"
            data-ad-slot={slot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
        <div className="text-xs text-muted-foreground pt-1 pb-2">Advertisement</div>
      </div>
    </Card>
  );
}
