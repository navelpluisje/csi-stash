import React from 'react';
import { Page } from '@components/organisms/adminPage';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Link } from '@components/atoms/link';

const Admin = () => (
  <Page>
    <Head>
      <title>CSI-Stash :: Admin</title>
    </Head>

    <h4>Admin</h4>
    <p><Link href="/admin/controllers">Controllers</Link></p>

  </Page>
);

export default withPageAuthRequired(Admin);
