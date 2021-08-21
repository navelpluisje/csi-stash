import React from 'react';
import { Link } from '@components/atoms/link';

export const PageHeader = () => (
  <header className="page-header">
    <Link href="/">
      <img src="/images/logo.png" alt="" />
      <h4>-stash</h4>
    </Link>
    <Link href="/api/auth/logout">Log out</Link>
  </header>
);
