import React, { useEffect, useState } from 'react';
import { Page } from '@components/page';
import { Card } from '@components/card';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ControllerPage = () => {
  const { query } = useRouter();
  const [controller, setController] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof query.id !== 'undefined') {
      setLoading(true);
      fetch(`/api/controller/${query.id}`)
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setController(result[0]);
        });
    }
  }, [query]);

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Controller</h2>
      <p>Select your configuration</p>
      {loading && <div>Loading.......</div> }
      <section className="card-container">
        {controller && (
          <Card
            title={controller.brand}
            subtitle={controller.model}
            image={{
              src: `/images/controllers/${controller.brand.toLowerCase()}-${controller.model.toLowerCase()}.png`,
              alt: 'The controller',
            }}
          />
        )}
      </section>
      <h3>Configurations</h3>
    </Page>
  );
};

export default ControllerPage;
