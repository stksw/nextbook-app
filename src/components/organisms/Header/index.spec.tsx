import { render, screen, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Header from '.';
import AuthContextProvider from 'contexts/AuthContext';
import { useShoppingCartContext } from 'contexts/ShoppingCartContext';
import { theme } from 'themes';
import type { User, Product } from 'types';

// ダミーユーザー
const authUser: User = {
  id: 1,
  username: 'dummy',
  displayName: 'Taketo Yoshida',
  email: 'test@example.com',
  profileImageUrl: '/images/sample/1.jpg',
  description: '',
};

// ダミー商品
const product: Product = {
  id: 1,
  category: 'book',
  title: 'Product',
  description: '',
  imageUrl: '/images/sample/1.jpg',
  blurDataUrl: '',
  price: 1000,
  condition: 'used',
  owner: authUser,
};

// ShoppingCartContextのモック
jest.mock('contexts/ShoppingCartContext');
// オリジナルのShoppingCartContextProviderを取得
const { ShoppingCartContextProvider } = jest.requireActual('contexts/ShoppingCartContext');

describe('Header', () => {
  let renderResult: RenderResult;
  const useShoppingCartContextMock = useShoppingCartContext as jest.MockedFunction<
    typeof useShoppingCartContext
  >;

  it('exist item in cart', async () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [product],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    });

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider authUser={authUser} context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>
    );

    expect(screen.getAllByTestId('badge-wrapper').length).toBeGreaterThan(0);
    renderResult.unmount();
    useShoppingCartContextMock.mockReset();
  });

  it('before signin', () => {
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    });

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>
    );

    // before signin
    expect(screen.queryByTestId('profile-shape-image')).toBeNull();
    // cart is empty
    expect(screen.queryByTestId('badge-wrapper')).toBeNull();

    renderResult.unmount();
    useShoppingCartContextMock.mockReset();
  });
});
