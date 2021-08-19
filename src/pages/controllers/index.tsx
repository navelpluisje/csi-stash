import React, { useEffect, useState } from 'react';
import { Page } from '@components/page';
import { Card } from '@components/card';
import Head from 'next/head';
import Link from 'next/link';

const ControllerPage = () => {
  const [controllers, setControllers] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/controller')
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setControllers(result);
      });
  }, []);

  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h4>Controllers</h4>
      <p>Select your controller</p>
      <section className="card-container">
        {loading && <div>Loading.......</div> }
        {controllers.length > 0 && controllers.map((controller) => (
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
                <a className="button button-outline" href="dummy">Select</a>
              </Link>
            </footer>
          </Card>
        ))}
      </section>
    </Page>
  );
};

export default ControllerPage;
