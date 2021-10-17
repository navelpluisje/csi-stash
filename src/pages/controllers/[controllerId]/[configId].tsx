import React from 'react';
import { StepsPage } from '@components/organisms/stepsPage';
import { Card } from '@components/atoms/card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Configuration } from '@components/atoms/configuration';
import { Layout } from '@components/atoms/layout';
import { getControllerById } from '@store/controllers/selectors';
import { getConfigurationById } from '@store/configuration/selectors';
import { useAppSelector } from '@hooks/redux';

const ControllerPage = () => {
  const { query } = useRouter();
  const controller = useAppSelector(
    getControllerById(parseInt(query.controllerId as string, 10)),
  );
  const configuration = useAppSelector(
    getConfigurationById(parseInt(query.configId as string, 10)),
  );

  return (
    <StepsPage>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Configuration</h2>
      <Layout columns="2fr 1fr">
        <section>
          <h3>Configurations</h3>

        </section>
        <section>
          {/* {isLoading || configLoading && <div>Loading.......</div>} */}
          {controller && (
            <Card
              title={controller.brand}
              subtitle={controller.model}
              image={{
                src: `/images/controllers/${controller.brand.toLowerCase()}-${controller.model.toLowerCase()}.png`,
                alt: 'The controller',
              }}
              horizontal
              small
            />
          )}
          {configuration && (
            <Configuration
              name={configuration?.name}
              author={configuration?.author}
              description={configuration?.description}
              onClick={() => console.log('ggogogooooogogog')}
            />
          )}
        </section>
      </Layout>
    </StepsPage>
  );
};

export default ControllerPage;
