import React from 'react';
import Image from 'next/image';
import { Link } from '@components/atoms/link';

interface Props {
  twoColumn?: boolean;
}

export const Page: React.FC<Props> = ({ children, twoColumn }) => (
  <>
    <header className="page-header">
      <Link href="/">
        <img src="/images/logo.png" alt="" />
        <h4>-stash</h4>
      </Link>
      <Link href="/api/auth/logout">Log out</Link>
    </header>
    <main className={`site-content${twoColumn ? ' two-column' : ''}`}>
      {children}
    </main>
    <footer className="page-footer">
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
