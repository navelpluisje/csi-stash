import React, { useEffect } from 'react';
import { StepsPage } from '@components/organisms/stepsPage';
import { Card } from '@components/atoms/card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Configuration } from '@components/atoms/configuration';
import { Layout } from '@components/atoms/layout';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchZonesByController } from '@store/zone/actions';
import { getFilteredZonesByController } from '@store/zone/selectors';
import { Zone, ZoneList } from '@components/atoms/zone';
import { getDownloadConfiguration, getDownloadController, getDownloadZones } from '@store/download/selectors';
import { addZone } from '@store/download/actions';

const ConfigurationPage: React.FC = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const controller = useAppSelector(getDownloadController);
  const configuration = useAppSelector(getDownloadConfiguration);
  const selectedZones = useAppSelector(getDownloadZones);
  const zones = useAppSelector(getFilteredZonesByController);

  useEffect(() => {
    if (query.controllerId) {
      dispatch(fetchZonesByController(query.controllerId as string));
    }
  }, [query]);

  const handleZoneClick = (zoneId: number) => {
    dispatch(addZone(zoneId));
  };

  return (
    <StepsPage>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>
      {console.log(zones)}
      <h2>Zones</h2>
      <Layout columns="2fr 1fr">
        <section>
          <ZoneList>
            {!!zones.length && zones.map((zone) => (
              <Zone
                name={zone.name}
                description={zone.description}
                author={zone.author}
                type={zone.type}
                onClick={() => handleZoneClick(zone.id)}
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
          {!!selectedZones.length && (
            <>
              {selectedZones.map(({
                id, name, author, description, type,
              }) => (
                <Zone
                  key={id}
                  name={name}
                  author={author}
                  description={description}
                  type={type}
                  onClick={() => console.log('ggogogooooogogog')}
                />
              ))}
            </>
          )}
        </section>
      </Layout>
    </StepsPage>
  );
};

export default ConfigurationPage;
