import React from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Admin = () => (
  <Page>
    <Head>
      <title>CSI-Stash :: Admin</title>
    </Head>

    <h4>Controllers</h4>
    <p>list of controllers</p>
    <a href="/admin/controllers/create" className="button">Add new controller</a>
  </Page>
);

export default withPageAuthRequired(Admin);
