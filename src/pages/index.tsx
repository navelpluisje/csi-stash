import React from 'react';
import Head from 'next/head';
import { Page } from '@components/organisms/page';
import { Link } from '@components/atoms/link';
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
      <Link href="/controllers">Go to the controllers</Link>
      {/*
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
