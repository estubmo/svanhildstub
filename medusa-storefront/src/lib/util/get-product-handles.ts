import { medusaClient } from '../config';

export const getProductHandles = async (): Promise<Array<string>> => {
  const products = await medusaClient.products
    .list({ limit: 25 })
    .then(({ products }) => products);

  const handles: Array<string> = [];

  for (const product of products) {
    if (product.handle) {
      handles.push(product.handle);
    }
  }

  return handles;
};
