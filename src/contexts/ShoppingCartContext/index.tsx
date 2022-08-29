import React, { createContext, useContext, useReducer } from 'react';
import { ADD_PRODUCT, REMOVE_PRODUCT, shopReducer } from './reducers';
import { Product } from 'types';

type ShoppingCartContextType = {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
});

export const useShoppingCartContext = (): ShoppingCartContextType => {
  return useContext<ShoppingCartContextType>(ShoppingCartContext);
};

type ShoppingCartContextProps = {
  children?: React.ReactNode;
};

const ShoppingCartContextProvider = ({
  children,
}: ShoppingCartContextProps) => {
  const products: Product[] = [];
  const [cart, dispatch] = useReducer(shopReducer, products);

  const addProductToCart = (product: Product) => {
    dispatch({ type: ADD_PRODUCT, payload: product });
  };

  const removeProductFromCart = (productId: number) => {
    dispatch({ type: REMOVE_PRODUCT, payload: productId });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addProductToCart, removeProductFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContextProvider;
