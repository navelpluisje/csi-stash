import Head from 'next/head';
import Image from 'next/image';
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
    </Page>
  )
}
