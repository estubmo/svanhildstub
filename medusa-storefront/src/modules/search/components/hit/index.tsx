import { ProductVariant } from '@medusajs/medusa';
import { Container, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Thumbnail from '@modules/products/components/thumbnail';

export type ProductHit = {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  variants: Array<ProductVariant>;
  collection_handle: string | null;
  collection_id: string | null;
};

export type HitProps = {
  hit: ProductHit;
};

const Hit = ({ hit }: HitProps) => {
  return (
    <LocalizedClientLink href={`/store/products/${hit.handle}`}>
      <Container
        key={hit.id}
        className="flex w-full items-center gap-2 p-4 shadow-elevation-card-rest hover:shadow-elevation-card-hover sm:flex-col sm:justify-center"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="group h-12 w-12 sm:h-full sm:w-full"
        />
        <div className="group flex flex-col justify-between">
          <div className="flex flex-col">
            <Text className="text-ui-fg-subtle">{hit.title}</Text>
          </div>
        </div>
      </Container>
    </LocalizedClientLink>
  );
};

export default Hit;
