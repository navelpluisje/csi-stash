import React from 'react';

interface Props {
    columns: string;
}

export const Layout: React.FC<Props> = ({ children, columns }) => (
  <section className="layout" style={{ gridTemplateColumns: columns }}>
    {children}
  </section>
);
