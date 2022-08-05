import { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { StoreProvider } from 'easy-peasy';
import { store } from '../src/store/store';

import '../styles/globals.css'

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
      {getLayout(<Component {...pageProps} />)}
    </StoreProviderCasted>
  );
  // return getLayout(
  //   <StoreProviderCasted store={store}>
  //     <Component {...pageProps} />
  //   </StoreProviderCasted>
  // )
};

export default appWithTranslation(MyApp);

