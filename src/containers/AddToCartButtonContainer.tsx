import Button from 'components/atoms/Button';
import { useShoppingCartContext } from 'contexts/ShoppingCartContext';
import type { Product } from 'types';

interface AddToCartButtonContainerProps {
  product: Product; // 追加される商品
  onAddToCartButtonClick?: (product: Product) => void; // 追加ボタンを押した時のイベントハンドラ
}

const AddToCartButtonContainer = ({
  product,
  onAddToCartButtonClick,
}: AddToCartButtonContainerProps) => {
  const { cart, addProductToCart } = useShoppingCartContext();

  const handleClick = () => {
    const productId = Number(product.id);
    const result = cart.findIndex((v) => v.id === productId);

    if (result === -1) {
      addProductToCart(product);
    }

    onAddToCartButtonClick && onAddToCartButtonClick(product);
  };

  return (
    <Button
      width={{ base: '100%', md: '400px' }}
      height="66px"
      onClick={handleClick}
    >
      カートに追加
    </Button>
  );
};

export default AddToCartButtonContainer;
