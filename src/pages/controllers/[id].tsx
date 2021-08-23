import React from 'react';
import { StepsPage } from '@components/organisms/stepsPage';
import { Card } from '@components/atoms/card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGetControllerByIdQuery } from '@store/controller.service';
import { useGetAllConfigurationsQuery } from '@store/configuration.service';
import { Configuration, ConfigurationList } from '@components/atoms/configuration';

const ControllerPage = () => {
  const { query } = useRouter();
  const { data = [], isLoading } = useGetControllerByIdQuery(parseInt(query.id as string, 10));
  const {
    data: configurations,
    isLoading: configLoading,
  } = useGetAllConfigurationsQuery(query.id as string);

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
      {configLoading && (
        <div>Loading......</div>
      )}
      {!configurations && !configLoading && (
        <div>No configurations yet</div>
      )}
      <ConfigurationList>

        {configurations?.map((config) => (
          <Configuration
            name={config.name}
            author={config.author}
          />
        ))}
      </ConfigurationList>
    </StepsPage>
  );
};

export default ControllerPage;
