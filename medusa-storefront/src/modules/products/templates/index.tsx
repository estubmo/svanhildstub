'use client';

import { ProductProvider } from '@lib/context/product-context';
import { useIntersection } from '@lib/hooks/use-in-view';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import ImageGallery from '@modules/products/components/image-gallery';
import MobileActions from '@modules/products/components/mobile-actions';
import ProductOnboardingCta from '@modules/products/components/product-onboarding-cta';
import ProductTabs from '@modules/products/components/product-tabs';
import RelatedProducts from '@modules/products/components/related-products';
import ProductInfo from '@modules/products/templates/product-info';
import React, { useEffect, useRef, useState } from 'react';

import ProductActions from '../components/product-actions';

type ProductTemplateProps = {
  product: PricedProduct;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);

  const infoRef = useRef<HTMLDivElement>(null);

  const inView = useIntersection(infoRef, '0px');

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem('onboarding');
    setIsOnboarding(onboarding === 'true');
  }, []);

  return (
    <ProductProvider product={product}>
      <div className="content-container relative flex flex-col py-6 small:flex-row small:items-start">
        <div className="flex w-full flex-col gap-y-6 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="relative block w-full">
          <ImageGallery images={product?.images || []} />
        </div>
        <div
          className="flex w-full flex-col gap-y-12 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0"
          ref={infoRef}
        >
          {isOnboarding && <ProductOnboardingCta />}
          <ProductActions product={product} />
        </div>
      </div>
      <div className="content-container my-16 px-6 small:my-32 small:px-8">
        <RelatedProducts product={product} />
      </div>
      <MobileActions product={product} show={!inView} />
    </ProductProvider>
  );
};

export default ProductTemplate;
