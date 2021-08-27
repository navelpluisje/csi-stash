import React from 'react';

interface Props {}

export const Steps: React.FC<Props> = ({ children }) => (
  <aside className="steps-container">
    <ol className="steps-list">
      {children}
    </ol>
  </aside>
);