import type { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import GlobalSpinner from 'components/organisms/GlobalSpinner';
import AuthContextProvider from 'contexts/AuthContext';
import GlobalSpinnerContextProvider from 'contexts/GlobalSpinnerContext';
import ShoppingCartContextProvider from 'contexts/ShoppingCartContext';
import { theme } from 'themes';
import { ApiContext } from 'types';
import { fetcher } from 'utils';

const GlobalStyle = createGlobalStyle`
html,
body,
textarea {
  padding: 0;
  margin: 0;
  font-family: -apple-system, sans-serif;
}
* {
  box-sizing: border-box;
}
a {
  color: #000;
  text-decoration: none;
}
ol, ul {
  list-style-type: none;
}
`;

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            shouldRetryOnError: false,
            fetcher,
          }}
        >
          <GlobalSpinnerContextProvider>
            <ShoppingCartContextProvider>
              <AuthContextProvider context={context}>
                <GlobalSpinner />
                <Component {...pageProps} />
              </AuthContextProvider>
            </ShoppingCartContextProvider>
          </GlobalSpinnerContextProvider>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
