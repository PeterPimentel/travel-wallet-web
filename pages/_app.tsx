import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head'
import { ReactElement } from 'react';
import { StoreProvider } from 'easy-peasy';
import NextProgress from "next-progress";

import { store } from '../src/store/store';
import { APP_NAME, BASE_COLORS } from '../src/constants';

import '../styles/globals.css'
import '../styles/leaflet.css';


export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// Issue - https://github.com/ctrlplusb/easy-peasy/issues/741
type Props = StoreProvider["props"] & { children: React.ReactNode }
const StoreProviderCasted = StoreProvider as unknown as React.ComponentType<Props>

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <StoreProviderCasted store={store}>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextProgress color={BASE_COLORS.primary_active} options={{ showSpinner: false }} />
      {getLayout(<Component {...pageProps} />)}
    </StoreProviderCasted>
  );
};

export default MyApp;

