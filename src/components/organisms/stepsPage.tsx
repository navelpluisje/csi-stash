import React from 'react';
import { PageHeader } from '@components/molecules/pageheader';
import { PageFooter } from '@components/molecules/pagefooter';
import { Steps } from '@components/atoms/stepContainer';
import { Step } from '@components/atoms/configStep';
import { useRouter } from 'next/router';

interface Props {}

export const StepsPage: React.FC<Props> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <>
      <PageHeader />
      <main className="steps-content">
        <Steps>
          <Step
            description="Select the controller you would like to configure"
            active={asPath === '/controllers'}
          >
            Select Controller
          </Step>
          <Step>Step 2</Step>
          <Step>Step 3</Step>
          <Step>Step 4</Step>
        </Steps>
        <section className="content">
          {children}
        </section>
      </main>
      <PageFooter />
    </>
  );
};
