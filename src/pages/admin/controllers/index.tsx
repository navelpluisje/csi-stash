import React, { useEffect, useState } from 'react';
import { Page } from '@components/page';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Admin = () => {
  const [controllers, setControllers] = useState<Array<any>>([]);

  useEffect(() => {
    fetch('/api/pscale/controller')
      .then((res) => res.json())
      .then((result) => setControllers(result));
  }, []);

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Admin</title>
      </Head>

      <h4>Controllers</h4>
      <p>list of controllers</p>
      {controllers.length > 0 && controllers.map((controller) => (
        <li>{`${controller.brand} ${controller.model}`}</li>
      ))}
      <a href="/admin/controllers/create" className="button">Add new controller</a>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
