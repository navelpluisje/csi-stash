import React from 'react';
import { StepsPage } from '@components/stepsPage';
import { Card } from '@components/card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGetControllerByIdQuery } from '@store/controller.service';

const ControllerPage = () => {
  const { query } = useRouter();
  const { data = [], isLoading } = useGetControllerByIdQuery(parseInt(query.id as string, 10));

  return (
    <StepsPage>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Configuration</h2>
      {isLoading && <div>Loading.......</div> }
      {data.length > 0 && (
        <Card
          title={data[0].brand}
          subtitle={data[0].model}
          image={{
            src: `/images/controllers/${data[0].brand.toLowerCase()}-${data[0].model.toLowerCase()}.png`,
            alt: 'The controller',
          }}
          horizontal
        />
      )}
      <h3>Configurations</h3>
    </StepsPage>
  );
};

export default ControllerPage;
