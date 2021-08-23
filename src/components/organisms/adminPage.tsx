import React from 'react';
import { PageHeader } from '@components/molecules/pageheader';
import { PageFooter } from '@components/molecules/pagefooter';

interface Props {
  twoColumn?: boolean;
}

export const Page: React.FC<Props> = ({ children, twoColumn }) => (
  <>
    <PageHeader />
    <main className={`site-content${twoColumn ? ' two-column' : ''}`}>
      {children}
    </main>
    <PageFooter />
  </>
);
