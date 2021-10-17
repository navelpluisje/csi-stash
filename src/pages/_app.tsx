import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AnimateSharedLayout } from 'framer-motion';
import { AppProps } from 'next/app';
import store, { persistor } from '@store/store';
import '../styles/globals.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <UserProvider>
        <AnimateSharedLayout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </UserProvider>
    </PersistGate>
  </Provider>
);

export default MyApp;
