"use client";

import { useEffect } from 'react';

interface GoogleAdSenseProps {
  client: string; // Your AdSense Publisher ID
}

export default function GoogleAdSense({ client }: GoogleAdSenseProps) {
  useEffect(() => {
    try {
      // Check if the script is already added to prevent duplicates
      if (!document.getElementById('google-adsense-script')) {
        const script = document.createElement('script');
        script.id = 'google-adsense-script';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
        document.head.appendChild(script);
      }
    } catch (error) {
      console.error('Error loading AdSense:', error);
    }
  }, [client]);

  return null;
}
