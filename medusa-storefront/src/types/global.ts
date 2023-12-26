import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type CollectionData = {
  id: string;
  title: string;
};

export type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
};

export type StoreNavData = {
  collections: CollectionData[];
  hasMoreCollections: boolean;
  featuredProducts: PricedProduct[];
};

// page props for store pages (products and collection pages)
export type StoreProps<T> = {
  page: {
    data: T;
  };
};

// page props for non-store pages (home, about, contact, etc)
export type SiteProps = {
  site: {
    navData: StoreNavData;
  };
};

export type PrefetchedPageProps = {
  notFound: boolean;
};

// For pages with nested layouts
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<P = object, IP = P> = AppProps<P> & {
  Component: NextPageWithLayout<P, IP>;
};

export type ProductPreviewType = {
  id: string;
  title: string;
  handle: string | null;
  thumbnail: string | null;
  created_at?: Date;
  price?: {
    calculated_price: string;
    original_price: string;
    difference: string;
    price_type: 'default' | 'sale';
  };
  isFeatured?: boolean;
};

export type InfiniteProductPage = {
  response: {
    products: PricedProduct[];
    count: number;
  };
};
