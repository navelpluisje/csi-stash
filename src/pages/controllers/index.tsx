import React from 'react';
import { Page } from '@components/page';
import { Card } from '@components/card';
import Head from 'next/head';
import Link from 'next/link';
import { useGetAllControllersQuery, usePrefetch } from '@store/controller.service';

const ControllerPage = () => {
  const { data = [], isLoading } = useGetAllControllersQuery();
  const prefetchController = usePrefetch('getControllerById');

  const prefetch = (id: number) => {
    prefetchController(id);
  };

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>
      <h4>Controllers</h4>
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
              <Link href={`/controllers/${controller.id}`} passHref>
                <a
                  className="button button-outline"
                  href="dummy"
                  onFocus={() => prefetch(controller.id)}
                  onMouseOver={() => prefetch(controller.id)}
                >
                  Select

                </a>
              </Link>
            </footer>
          </Card>
        ))}
      </section>
    </Page>
  );
};

export default ControllerPage;
