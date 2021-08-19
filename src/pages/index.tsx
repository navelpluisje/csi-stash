import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Page } from '@components/page';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Home</title>
      </Head>

      <h1 className={styles.title}>
        Welcome to SCI-Stash
      </h1>
      <ul>
        <ol>Select your controller</ol>
        <ol>Select the configuration of choice</ol>
        <ol>Select teh effects and instruments to include</ol>
        <ol>Download the package</ol>
        <ol>Install the</ol>
      </ul>
      <Link href="/controllers">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Go to the controllers</a>
      </Link>
      {/* <a href="/api/auth/login">Login</a>
      <br />
      <a href="/api/auth/logout">Logout</a>
      <div>
        { profile && console.log({ profile })}
        { user && (
          <div>
            {console.log(user)}
            <img src={user.picture || ''} alt={user.nickname || ''} />
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
          </div>
        )}
      </div> */}
    </Page>
  );
}
