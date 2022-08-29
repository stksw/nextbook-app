import type { ApiContext, Product } from 'types';
import { fetcher } from 'utils';

export type GetProductParams = {
  id: number; // 取得する商品ID
};

const getProduct = async (
  context: ApiContext,
  { id }: GetProductParams,
): Promise<Product> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
    {
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export default getProduct;
