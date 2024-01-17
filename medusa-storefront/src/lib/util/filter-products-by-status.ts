import { ProductDTO } from '@medusajs/types/dist/product/common';

export default function filterProductsByStatus(
  products: Array<ProductDTO>,
  status: string,
) {
  return products.filter((product) => product.status === status);
}
