import { ProductVariant } from '@medusajs/medusa';
import { Container, Text } from '@medusajs/ui';
import Thumbnail from '@modules/products/components/thumbnail';
import Link from 'next/link';

export type ProductHit = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  variants: ProductVariant[];
  collection_handle: string | null;
  collection_id: string | null;
};

export type HitProps = {
  hit: ProductHit;
};

const Hit = ({ hit }: HitProps) => {
  return (
    <Container
      key={hit.id}
      className="grid w-full grid-cols-[1fr] items-center justify-center gap-2 overflow-visible p-4 shadow-elevation-card-rest transition-transform duration-300 ease-in-out group-hover/hit:scale-105 "
    >
      <Thumbnail thumbnail={hit.thumbnail} size="square" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col text-ui-fg-subtle group-hover/hit:text-ui-fg-on-color group-hover/hit:underline ">
          {hit.collection_id && (
            <Link href={`/collections/${hit.collection_handle}`} className=" ">
              {hit.collection_handle}
            </Link>
          )}
          <Text className="">{hit.title}</Text>
        </div>
      </div>
    </Container>
  );
};

export default Hit;
