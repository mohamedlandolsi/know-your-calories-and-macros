"use client";

import { useEffect, useRef } from 'react';

interface SideAdProps {
  slot: string;
  position: 'left' | 'right';
}

export default function SideAd({ slot, position }: SideAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Only attempt to load ads on the client side
      if (typeof window !== 'undefined' && adRef.current) {
        // @ts-expect-error: window.adsbygoogle is added by the external AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Side Ad:', error);
    }
  }, []);

  return (
    <div className={`side-ad side-ad-${position} hidden lg:block`}>
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1830337896450418"
          data-ad-slot={slot}
          data-ad-format="vertical"
        />
      </div>
      <div className="text-xs text-muted-foreground text-center mt-2">
        Advertisement
      </div>
    </div>
  );
}
