import React, { useEffect } from 'react';
import { StepsPage } from '@components/organisms/stepsPage';
import { Card } from '@components/atoms/card';
import Head from 'next/head';
import { Link } from '@components/atoms/link';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchAllControllers, fetchControllerById } from '@store/controllers/actions';
import { getAllControllers, isAllControllersLoading } from '@store/controllers/selectors';
import { addController } from '@store/download/actions';

const ControllerPage: React.FC = () => {
  const controllers = useAppSelector(getAllControllers);
  const isLoading = useAppSelector(isAllControllersLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllControllers());
  }, []);

  const prefetch = (id: number) => {
    dispatch(fetchControllerById(id));
  };

  const handleControllerClick = (controllerId: number) => {
    dispatch(addController(controllerId));
  };

  return (
    <StepsPage>
      <Head>
        <title>CSI-Stash :: Controllers</title>
      </Head>

      <h2>Controller</h2>
      <p>Select your controller</p>
      <section className="card-container">
        {isLoading && <div>Loading.......</div>}
        {controllers.length > 0 && controllers.map((controller) => (
          <Card
            key={controller.id}
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
                onClick={() => handleControllerClick(controller.id)}
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
