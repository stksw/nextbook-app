import { Fragment } from 'react';
import Link from 'next/link';
import ProductCard from 'components/organisms/ProductCard';
import ProductCardList from 'components/organisms/ProductCardList';
import { Product } from 'types';

type UserProductCardListContainerProps = {
  userId: number; // 商品を保有するユーザーID
  products: Product[]; // 初期で表示する商品リスト
};

const UserProductCardListContainer = ({
  userId,
  products: userProducts,
}: UserProductCardListContainerProps) => {
  return (
    <ProductCardList numberPerRow={6} numberPerRowForMobile={2}>
      {userProducts.map((p) => (
        <Fragment key={p.id}>
          <Link href={``}>
            <a>
              <ProductCard title={p.title} price={p.price} imageUrl={p.imageUrl} />
            </a>
          </Link>
        </Fragment>
      ))}
    </ProductCardList>
  );
};

export default UserProductCardListContainer;
