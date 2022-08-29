import { ApiContext, Category, Condition, Product } from 'types';
import { fetcher } from 'utils';

export type GetAllProductsParams = {
  category?: Category; // 商品カテゴリ
  conditions?: Condition[]; // 商品状態
  userId?: number; // 所有するユーザーID
  sort?: keyof Omit<Product, 'owner'>; // ソートするキー
  order?: 'asc' | 'desc'; // 昇順or降順
  limit?: number; // 取得数
  page?: number; // ページ数
};

/**
 * プロダクトAPI（一覧取得）
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns 商品一覧
 */
const getAllProducts = async (
  context: ApiContext,
  {
    userId,
    category,
    conditions,
    page,
    limit,
    sort = 'id',
    order = 'desc',
  }: GetAllProductsParams = {},
): Promise<Product[]> => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`;
  const params = new URLSearchParams();

  category && params.append('category', category);
  conditions &&
    conditions.forEach((condition) => params.append('conditions', condition));
  userId && params.append('owner.id', `${userId}`);
  page && params.append('_page', `${page}`);
  limit && params.append('_limit', `${limit}`);
  sort && params.append('_sort', sort);
  order && params.append('_order', order);
  const query = params.toString();

  return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  });
};

export default getAllProducts;
