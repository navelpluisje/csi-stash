import React from 'react';

interface Props {
  description: string;
  active: boolean;
}

export const Step: React.FC<Props> = ({
  children,
  description,
  active,
}) => (
  <li className={`steps-step${active ? ' active' : ''}`}>
    <h4>{children}</h4>
    <div>{description}</div>
  </li>
);
