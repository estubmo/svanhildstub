import { isEqual } from '@lib/is-equal';
import { omit } from '@lib/omit';
import { Address } from '@medusajs/medusa';

export default function compareAddresses(
  address1?: Address | null,
  address2?: Address | null,
) {
  if (!address1 || !address2) return false;
  return isEqual(
    omit(address1, [
      'id',
      'created_at',
      'updated_at',
      'deleted_at',
      'metadata',
      'customer_id',
    ]),
    omit(address2, [
      'id',
      'created_at',
      'updated_at',
      'deleted_at',
      'metadata',
      'customer_id',
    ]),
  );
}
