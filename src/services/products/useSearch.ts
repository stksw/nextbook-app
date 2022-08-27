import useSWR from 'swr';
import { ApiContext, Category, Condition, Product } from 'types';

export type UseSearchProps = {
  category?: Category;
  conditions?: Condition[];
  sort?: keyof Omit<Product, 'owner'>;
  order?: 'asc' | 'desc';
  userId?: number;
  initial?: Product[];
};

export type UseSearch = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

const useSearch = (
  context: ApiContext,
  { category, conditions, sort = 'id', order = 'desc', userId, initial }: UseSearchProps = {}
): UseSearch => {
  // ex. api/proxy/products?category=book
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`;
  const params = new URLSearchParams();

  category && params.append('category', category);
  conditions && conditions.forEach((condition) => params.append('conditions', condition));
  userId && params.append('owner.id', `${userId}`);
  sort && params.append('_sort', sort);
  order && params.append('_order', order);

  const query = params.toString();
  const { data, error } = useSWR<Product[]>(query.length > 0 ? `${path}?${params}` : path);

  return {
    products: data ?? initial ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useSearch;
