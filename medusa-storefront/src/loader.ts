'use client';

import { ImageLoader, ImageLoaderProps } from 'next/image';

export const imageLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  return `https://next-image-transform.svanhildstub.com/image/${src}?w=${width}&q=${quality || 75}`;
};
