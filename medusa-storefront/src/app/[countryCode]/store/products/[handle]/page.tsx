import { listProducts } from '@lib/data/products';
import { getRegion, listRegions } from '@lib/data/regions';
import ProductTemplate from '@modules/products/templates';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = Promise<{
  params: Promise<{ countryCode: string; handle: string }>;
  searchParams: Promise<{ v_id?: string }>;
}>;

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat(),
    );

    if (!countryCodes) {
      return [];
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: 'handle' },
      });

      return {
        country,
        products: response.products,
      };
    });

    const countryProducts = await Promise.all(promises);

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        })),
      )
      .filter((param) => param.handle);
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : 'Unknown error'
      }.`,
    );
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = await props;
  const { handle, countryCode } = await params;
  const region = await getRegion(countryCode);

  console.info('DEBUGPRINT[564]: page.tsx:59: handle=', handle);
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
  const { params } = await props;
  const { handle, countryCode } = await params;
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
