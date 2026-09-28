import { Box } from '@chakra-ui/react';
import type { ResponsiveImageSources } from '@/data/projectCatalog';
import { ResponsiveImagePicture } from '@/components/ResponsiveImagePicture';

type ResponsiveProjectImageProps = {
  alt: string;
  sources: ResponsiveImageSources;
  sizes: string;
  loading?: 'eager' | 'lazy';
  objectFit?: 'cover' | 'contain';
};

export function ResponsiveProjectImage({ alt, sources, sizes, loading = 'lazy', objectFit = 'cover' }: ResponsiveProjectImageProps) {
  return (
    <Box w="full" h="full">
      <ResponsiveImagePicture alt={alt} sources={sources} sizes={sizes} loading={loading} objectFit={objectFit} />
    </Box>
  );
}
