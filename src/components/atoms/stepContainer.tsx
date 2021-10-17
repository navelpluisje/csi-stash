import React from 'react';

export const Steps: React.FC = ({ children }) => (
  <aside className="steps-container">
    <ol className="steps-list">
      {children}
    </ol>
  </aside>
);
