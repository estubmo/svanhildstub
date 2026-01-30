import { getCollectionByHandle } from '@lib/data/collections';
import CollectionTemplate from '@modules/collections/templates';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ handle: string; countryCode: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: SortOptions;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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

export default async function CollectionPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams;

  const collection = await getCollectionByHandle(params.handle);

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
