import React, { useEffect, useState } from 'react';
import { Page } from '@components/page';
import { Card } from '@components/card';
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
      <section className="card-container">
        {controllers.length > 0 && controllers.map((controller) => (
          <Card
            title={controller.brand}
            subtitle={controller.model}
            image={{
              src: `/images/controllers/${controller.brand.toLowerCase()}-${controller.model.toLowerCase()}.png`,
              alt: 'The controller',
            }}
          />
        ))}
      </section>
    </Page>
  );
};

export default withPageAuthRequired(Admin);
