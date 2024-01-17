import { Address } from '@medusajs/medusa';
import { isEqual, omit } from 'lodash';

export default function compareAddresses(
  address1?: Address | null,
  address2?: Address | null,
) {
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
