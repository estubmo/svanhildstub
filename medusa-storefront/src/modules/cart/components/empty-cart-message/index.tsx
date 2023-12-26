import { Heading, Text } from '@medusajs/ui';
import UnderlineLink from '@modules/common/components/interactive-link';

const EmptyCartMessage = () => {
  return (
    <div className="flex flex-col items-start justify-center py-48">
      <Heading
        level="h1"
        className="text-3xl-regular flex flex-row items-baseline gap-x-2"
      >
        Cart
      </Heading>
      <Text className="text-base-regular mb-6 mt-4 max-w-[32rem]">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </Text>
      <div>
        <UnderlineLink href="/store">Explore products</UnderlineLink>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
