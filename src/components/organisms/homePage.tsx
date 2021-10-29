import React from 'react';
import { PageHeader } from '@components/molecules/pageheader';
import { PageFooter } from '@components/molecules/pagefooter';

export const HomePage: React.FC = ({ children }) => (
  <>
    <PageHeader />
    <main className="home-content">
      {children}
    </main>
    <PageFooter />
  </>
);
