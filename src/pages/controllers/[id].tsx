import React from 'react';
import { Page } from '@components/page';
import { Card } from '@components/card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGetControllerByIdQuery } from '@store/controller.service';

const ControllerPage = () => {
  const { query } = useRouter();
  const { data = [], isLoading } = useGetControllerByIdQuery(parseInt(query.id as string, 10));

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Controller</h2>
      <p>Select your configuration</p>
      {isLoading && <div>Loading.......</div> }
      <section className="card-container">
        {data.length > 0 && (
          <Card
            title={data[0].brand}
            subtitle={data[0].model}
            image={{
              src: `/images/controllers/${data[0].brand.toLowerCase()}-${data[0].model.toLowerCase()}.png`,
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
