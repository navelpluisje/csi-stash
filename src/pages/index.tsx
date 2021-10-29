import React from 'react';
import Head from 'next/head';
import { Link } from '@components/atoms/link';
import { HomeSlider } from '@components/molecules/homeSlider';
import { HomePage } from '@components/organisms/homePage';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => (
  <HomePage>
    <Head>
      <title>CSI-Stash :: Home</title>
    </Head>

    <HomeSlider />
    <section className="home-content-area">
      <header>
        <h1 className={styles.title}>
          Welcome to SCI-Stash
        </h1>
      </header>
      <section className="left">
        <h2>Why?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet blanditiis quaerat non ad est, impedit aut repellat,
        </p>
      </section>
      <section className="right">
        <h2>¿How?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet blanditiis quaerat non ad est, impedit aut repellat,
        </p>
        <Link href="/controllers" button outline>Select your controllers</Link>
      </section>
    </section>

  </HomePage>
);

export default Home;
