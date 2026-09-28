import { Box, Image } from '@chakra-ui/react';
import type { ResponsiveImageSources } from '@/data/projectCatalog';

type ResponsiveProjectImageProps = {
  alt: string;
  fallback: string;
  sources?: ResponsiveImageSources | null;
  loading?: 'eager' | 'lazy';
};

function assetSrc(src: string) {
  return encodeURI(src);
}

function srcSet(sources: ResponsiveImageSources['webp']) {
  return sources.map((source) => `${assetSrc(source.src)} ${source.width}w`).join(', ');
}

export function ResponsiveProjectImage({
  alt,
  fallback,
  sources,
  loading = 'lazy',
}: ResponsiveProjectImageProps) {
  return (
    <Box as="picture" display="block" w="full" h="full">
      {sources && <source type="image/avif" srcSet={srcSet(sources.avif)} sizes={sources.sizes} />}
      {sources && <source type="image/webp" srcSet={srcSet(sources.webp)} sizes={sources.sizes} />}
      <Image src={assetSrc(fallback)} alt={alt} w="full" h="full" objectFit="cover" loading={loading} />
    </Box>
  );
}
