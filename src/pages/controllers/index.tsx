import React from 'react';
import { StepsPage } from '@components/stepsPage';
import { Card } from '@components/card';
import Head from 'next/head';
import { useGetAllControllersQuery, usePrefetch } from '@store/controller.service';
import { Link } from '@components/atoms/link';

const ControllerPage = () => {
  const { data = [], isLoading } = useGetAllControllersQuery();
  const prefetchController = usePrefetch('getControllerById');

  const prefetch = (id: number) => {
    prefetchController(id);
  };

  return (
    <StepsPage>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Controller</h2>
      <p>Select your controller</p>
      <section className="card-container">
        {isLoading && <div>Loading.......</div> }
        {data.length > 0 && data.map((controller) => (
          <Card
            title={controller.brand}
            subtitle={controller.model}
            image={{
              src: `/images/controllers/${controller.brand.toLowerCase()}-${controller.model.toLowerCase()}.png`,
              alt: 'The controller',
            }}
          >
            <footer>
              <Link
                href={`/controllers/${controller.id}`}
                onFocus={() => prefetch(controller.id)}
                onMouseOver={() => prefetch(controller.id)}
                button
                outline
                wide
              >
                Select
              </Link>
            </footer>
          </Card>
        ))}
      </section>
    </StepsPage>
  );
};

export default ControllerPage;
