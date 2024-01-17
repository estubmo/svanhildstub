import { ProductVariant } from '@medusajs/medusa';
import { Text } from '@medusajs/ui';

type LineItemOptionsProps = { variant: ProductVariant };

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  return (
    <Text className="txt-medium inline-block w-full overflow-hidden text-ellipsis text-ui-fg-subtle">
      Variant: {variant.title}
    </Text>
  );
};

export default LineItemOptions;
