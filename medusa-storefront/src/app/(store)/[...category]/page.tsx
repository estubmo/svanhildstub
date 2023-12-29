import { getCategoryByHandle } from '@lib/data';
import CategoryTemplate from '@modules/categories/templates';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { category: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_categories } = await getCategoryByHandle(
    params.category,
  ).catch(() => {
    notFound();
  });

  const category = product_categories[0];

  if (!category) {
    notFound();
  }

  return {
    title: `${category.name} | Svanhild Stub`,
    description: `${category.name} category`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { product_categories } = await getCategoryByHandle(
    params.category,
  ).catch(() => {
    notFound();
  });

  return <CategoryTemplate categories={product_categories} />;
}
