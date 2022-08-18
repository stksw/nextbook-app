import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

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
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
