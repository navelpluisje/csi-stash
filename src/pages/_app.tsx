import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider as ReduxProvider } from 'react-redux';
import { AnimateSharedLayout } from 'framer-motion';
import { AppProps } from 'next/app';
import store from '@store/store';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ReduxProvider store={store}>
    <UserProvider>
      <AnimateSharedLayout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </UserProvider>
  </ReduxProvider>
);

export default MyApp;
