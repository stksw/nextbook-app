import useSWR from 'swr';
import type { ApiContext, Product } from 'types';

export type UseProductProps = {
  id: number; // 取得する商品ID
  initial?: Product; // 初期状態
};

export type UseProduct = {
  product?: Product; // 取得する商品
  isLoading: boolean; // ロードフラグ
  isError: boolean; // エラーフラグ
};

const useProduct = (context: ApiContext, { id, initial }: UseProductProps): UseProduct => {
  const { data, error } = useSWR<Product>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`
  );

  return {
    product: data ?? initial,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProduct;
