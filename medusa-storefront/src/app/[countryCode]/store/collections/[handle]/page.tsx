import { getCollectionByHandle, listCollections } from '@lib/data/collections';
import { listRegions } from '@lib/data/regions';
import { StoreCollection, StoreRegion } from '@medusajs/types';
import CollectionTemplate from '@modules/collections/templates';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { handle: string; countryCode: string };
  searchParams: {
    page?: string;
    sortBy?: SortOptions;
  };
};

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: '*products',
  });

  if (!collections) {
    return [];
  }
  const countryCodes = await listRegions().then(
    (regions: Array<StoreRegion>) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as Array<string>,
  );

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle,
  );

  const staticParams = countryCodes?.flatMap((countryCode) =>
    collectionHandles.map((handle) => ({
      countryCode,
      handle,
    })),
  );

  return staticParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  const metadata = {
    title: `${collection.title} | Svanhild Stub Store`,
    description: `${collection.title} collection`,
  } as Metadata;

  return metadata;
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams;

  const collection = await getCollectionByHandle(params.handle).then(
    (collection) => collection,
  );

  if (!collection) {
    notFound();
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  );
}
