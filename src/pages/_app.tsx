import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider as ReduxProvider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '@store/store';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ReduxProvider store={store}>
    <UserProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </UserProvider>
  </ReduxProvider>
);

export default MyApp;
