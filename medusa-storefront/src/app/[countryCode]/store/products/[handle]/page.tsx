import { listProducts } from '@lib/data/products';
import { getRegion } from '@lib/data/regions';
import ProductTemplate from '@modules/products/templates';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ countryCode: string; handle: string }>;
  searchParams: Promise<{ v_id?: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle, countryCode } = await props.params;
  const region = await getRegion(countryCode);

  if (!region) {
    notFound();
  }

  const product = await listProducts({
    countryCode: countryCode,
    // @ts-expect-error handle
    queryParams: { handle },
  }).then(({ response }) => response.products[0]);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage(props: Props) {
  const { handle, countryCode } = await props.params;
  const region = await getRegion(countryCode);

  if (!region) {
    notFound();
  }

  const pricedProduct = await listProducts({
    countryCode: countryCode,
    // @ts-expect-error handle
    queryParams: { handle },
  }).then(({ response }) => response.products[0]);

  if (!pricedProduct) {
    notFound();
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={countryCode}
    />
  );
}
