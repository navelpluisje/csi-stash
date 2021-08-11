import React from 'react';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';
import { Page } from '@components/page';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const { user } = useUser();
  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Home</title>
      </Head>

      <h1 className={styles.title}>
        Welcome to SCI-Stash
      </h1>
      <a href="/api/auth/login">Login</a>
      <br />
      <a href="/api/auth/logout">Logout</a>
      <div>
        { user && (
          <div>
            {console.log(user)}
            <img src={user.picture || ''} alt={user.nickname || ''} />
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
          </div>
        )}
      </div>
    </Page>
  );
}
