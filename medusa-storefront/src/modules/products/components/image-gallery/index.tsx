'use client';

import { Image as MedusaImage } from '@medusajs/medusa';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css';

type ImageGalleryProps = {
  images: Array<MedusaImage>;
};

type GalleryImageProps = {
  image: MedusaImage;
  index: number;
};

const GalleryImage = ({ image, index }: GalleryImageProps) => {
  return (
    <div className="relative w-full bg-ui-bg-subtle aspect-[29/34]">
      <Image
        src={image.url}
        priority={index <= 2 ? true : false}
        alt={`Product image ${index + 1}`}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 77vw, 50vw"
        quality={85}
      />
    </div>
  );
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex flex-1 flex-col gap-y-20 small:mx-16">
        {images.map((image, index) => {
          return (
            <Zoom key={image.id} classDialog="custom-zoom"

            >
              <GalleryImage image={image} index={index} />
            </Zoom>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
