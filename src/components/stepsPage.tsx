import React from 'react';
import { PageHeader } from '@components/molecules/pageheader';
import { PageFooter } from '@components/molecules/pagefooter';

interface Props {}

const Steps = () => (
  <aside>
    Steps here
  </aside>
);

export const StepsPage: React.FC<Props> = ({ children }) => (
  <>
    <PageHeader />
    <main className="steps-content">
      <Steps />
      <section className="content">
        {children}
      </section>
    </main>
    <PageFooter />
  </>
);
