import React, { useEffect } from 'react';
import { StepsPage } from '@components/organisms/stepsPage';
import { Card } from '@components/atoms/card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Configuration } from '@components/atoms/configuration';
import { Layout } from '@components/atoms/layout';
import { getControllerById } from '@store/controllers/selectors';
import { getConfigurationById } from '@store/configuration/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchZonesByConfiguration } from '@store/zone/actions';
import { getZonesByConfiguration } from '@store/zone/selectors';
import { Zone, ZoneList } from '@components/atoms/zone';

const ConfigurationPage: React.FC = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const controller = useAppSelector(
    getControllerById(parseInt(query.controllerId as string, 10)),
  );
  const configuration = useAppSelector(
    getConfigurationById(parseInt(query.configId as string, 10)),
  );
  const zones = useAppSelector(
    getZonesByConfiguration(parseInt(query.configId as string, 10)),
  );

  useEffect(() => {
    if (query.configId) {
      dispatch(fetchZonesByConfiguration(query.configId as string));
    }
  }, [query]);

  return (
    <StepsPage>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Zones</h2>
      <Layout columns="2fr 1fr">
        <section>
          <ZoneList>
            {console.log({ zones })}
            {zones.length && zones.map((zone) => (
              <Zone
                name={zone.name}
                description={zone.description}
                author={zone.author}
                type={zone.type}
                onClick={() => console.log('test')}
              />
            ))}
          </ZoneList>
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

export default ConfigurationPage;
