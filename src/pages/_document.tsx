import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Generated by create next app"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,500,500italic,700,700italic&display=optional"
          />
          <link rel="icon" href="/images/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
