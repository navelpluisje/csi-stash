import React from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Admin = () => (
  <Page>
    <Head>
      <title>CSI-Stash :: Admin</title>
    </Head>

    <h4>Admin</h4>
    <p><a href="/admin/controllers">Controllers</a></p>

  </Page>
);

export default withPageAuthRequired(Admin);
