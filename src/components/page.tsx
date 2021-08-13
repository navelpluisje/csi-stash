import React from 'react';
import Image from 'next/image';

interface Props {}

export const Page: React.FC<Props> = ({ children }) => (
  <>
    <header className="site-header">
      <a href="/">
        <img src="/images/logo.png" alt="" />
        <h4>-stash</h4>
      </a>
      <a href="/api/auth/logout">Log out</a>
    </header>
    <main className="site-content">
      {children}
    </main>
    <footer className="site-footer">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by
        {' '}
        <span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </>
);
