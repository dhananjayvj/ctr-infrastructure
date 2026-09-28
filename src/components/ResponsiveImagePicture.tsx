import type { ResponsiveImageSources } from '@/data/projectCatalog';

type ResponsiveImagePictureProps = {
  alt: string;
  sources: ResponsiveImageSources;
  sizes: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  objectPosition?: string;
  objectFit?: 'cover' | 'contain';
};

function srcSet(sources: ResponsiveImageSources['avif']) {
  return sources.map((source) => `${source.src} ${source.width}w`).join(', ');
}

export function ResponsiveImagePicture({
  alt,
  sources,
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
  objectPosition = 'center',
  objectFit = 'cover',
}: ResponsiveImagePictureProps) {
  return (
    <picture style={{ display: 'block', width: '100%', height: '100%' }}>
      {sources.avif.length > 0 && <source type="image/avif" srcSet={srcSet(sources.avif)} sizes={sizes} />}
      <source type="image/webp" srcSet={srcSet(sources.webp)} sizes={sizes} />
      <img
        src={sources.fallback.src}
        alt={alt}
        width={sources.fallback.width}
        height={sources.fallback.height}
        style={{ display: 'block', width: '100%', height: '100%', objectFit, objectPosition }}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
