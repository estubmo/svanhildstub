import { medusaClient } from '../config';

export const getCollectionIds = async (): Promise<Array<string>> => {
  const data = await medusaClient.collections
    .list({ limit: 100 })
    .then(({ collections }) => {
      return collections.map(({ id }) => id);
    });

  return data;
};
