import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {}

export const Page: React.FC<Props> = ({ children }) => (
  <>
    <header className="site-header">
      <Link href="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <img src="/images/logo.png" alt="" />
          <h4>-stash</h4>
        </a>
      </Link>
      <Link href="/api/auth/logout">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Log out</a>
      </Link>
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
