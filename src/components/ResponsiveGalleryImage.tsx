'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import type { ResponsiveImageSources } from '@/data/projectCatalog';
import { ResponsiveImagePicture } from '@/components/ResponsiveImagePicture';

type ResponsiveGalleryImageProps = {
  alt: string;
  sources: ResponsiveImageSources;
  eager?: boolean;
};

const GALLERY_SIZES = '(min-width: 80em) 33vw, (min-width: 48em) 50vw, 100vw';

export function ResponsiveGalleryImage({ alt, sources, eager = false }: ResponsiveGalleryImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(eager);

  useEffect(() => {
    if (nearViewport) return;
    const frame = frameRef.current;
    if (!frame) return;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: '600px 0px', threshold: 0 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [nearViewport]);

  return (
    <Box ref={frameRef} w="full" h="full" bg="dark.800" aria-busy={!nearViewport}>
      {nearViewport && <ResponsiveImagePicture alt={alt} sources={sources} sizes={GALLERY_SIZES} />}
    </Box>
  );
}
