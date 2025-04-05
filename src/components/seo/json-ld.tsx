"use client";

import { useEffect, useState, memo } from 'react';

// Define a more specific type for JSON-LD structured data
type JsonLdDataValue = string | number | boolean | null | JsonLdData | JsonLdDataValue[];
interface JsonLdData {
  '@context'?: string;
  '@type'?: string;
  [key: string]: JsonLdDataValue | undefined;
}

interface JsonLdProps {
  data: JsonLdData;
}

export const JsonLd = memo(({ data }: JsonLdProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
});

JsonLd.displayName = 'JsonLd';
