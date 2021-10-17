import React, { useEffect } from 'react';
import { StepsPage } from '@components/organisms/stepsPage';
import { Card } from '@components/atoms/card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@components/atoms/layout';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { getControllerById, isControllerByIdLoading } from '@store/controllers/selectors';
import { fetchConfigurationsByController } from '@store/configuration/actions';
import { Configuration, ConfigurationList } from '@components/atoms/configuration';
import { getConfigurationByController } from '@store/configuration/selectors';
import { fetchControllerById } from '@store/controllers/actions';

const ControllerPage = () => {
  const { query, push } = useRouter();
  const configurations = useAppSelector(
    getConfigurationByController(parseInt(query.controllerId as string, 10)),
  );
  const controller = useAppSelector(getControllerById(parseInt(query.controllerId as string, 10)));
  const isLoading = useAppSelector(isControllerByIdLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.controllerId) {
      dispatch(fetchControllerById(parseInt(query.controllerId as string, 10)));
      dispatch(fetchConfigurationsByController(parseInt(query.controllerId as string, 10)));
    }
  }, [query]);

  return (
    <StepsPage>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Configuration</h2>
      <Layout columns="2fr 1fr">
        <section>
          {/* {configLoading && (
            <div>Loading......</div>
          )} */}
          {!configurations && (
            <div>No configurations yet</div>
          )}
          <ConfigurationList>
            {configurations?.map((config) => (
              <Configuration
                key={config.id}
                name={config.name}
                author={config.author}
                description={config.description}
                onClick={() => push(`/controllers/${query.controllerId}/${config.id}`)}
              />
            ))}
          </ConfigurationList>
        </section>
        <section>
          {isLoading && <div>Loading.......</div>}
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
        </section>
      </Layout>
    </StepsPage>
  );
};

export default ControllerPage;
