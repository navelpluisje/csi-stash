import React from 'react';
import { PageHeader } from '@components/molecules/pageheader';
import { PageFooter } from '@components/molecules/pagefooter';
import { Steps } from '@components/atoms/stepContainer';
import { Step } from '@components/atoms/configStep';
import { useRouter } from 'next/router';
import { ConfigSteps } from '@constants';

interface Props {}

export const StepsPage: React.FC<Props> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <PageHeader />
      <main className="steps-content">
        <Steps>
          <Step
            description="Select the controller you would like to configure"
            active={pathname === ConfigSteps.Step1}
          >
            Select Controller
          </Step>
          <Step
            description="Select the configuration that match your needs"
            active={pathname === ConfigSteps.Step2}
          >
            Select Configuration
          </Step>
          <Step
            description="Select the FX and instruments you want to use"
            active={pathname === ConfigSteps.Step3}
          >
            Select Effects &amp; more
          </Step>
          <Step
            description="Download your selection"
            active={pathname === ConfigSteps.Step4}
          >
            Download
          </Step>
        </Steps>
        <section className="content">
          {children}
        </section>
      </main>
      <PageFooter />
    </>
  );
};
