'use client';

import { Image as MedusaImage } from '@medusajs/medusa';
import { imageLoader } from 'loader';
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
    <div className="relative min-h-[400px] w-full small:min-h-[250px] medium:min-h-[400px]">
      <Image
        src={image.url}
        loader={imageLoader}
        priority={index <= 2 ? true : false}
        alt={`Product image ${index + 1}`}
        className="object-contain"
        fill
        sizes="100w"
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
            <Zoom key={image.id} classDialog="custom-zoom">
              <GalleryImage image={image} index={index} />
            </Zoom>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
