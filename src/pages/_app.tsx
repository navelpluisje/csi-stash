import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </UserProvider>
);

export default MyApp;
