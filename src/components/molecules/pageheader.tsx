import React from 'react';
import { Link } from '@components/atoms/link';
import { useUser } from '@auth0/nextjs-auth0';

export const PageHeader: React.FC = () => {
  const { user } = useUser();

  return (
    <header className="page-header">
      <Link href="/">
        <img src="/images/logo.png" alt="" />
        <h4>-stash</h4>
      </Link>
      {!user && <Link href="/controllers" button>Start configuring</Link>}
      {!!user && <Link href="/api/auth/logout">Log out</Link>}
    </header>
  );
};
