import React from 'react';
import { Configuration as ConfigurationProps } from '@store/configuration.service';

interface CLProps {}

export const ConfigurationList: React.FC<CLProps> = ({ children }) => (
  <ul className="configuration-list">
    {children}
  </ul>
);

export const Configuration = ({ name, author }: Partial<ConfigurationProps>) => (
  <li className="configuration-item">
    <h4>{name}</h4>
    <div>
      Created by:
      {' '}
      <span className="author">{author}</span>
    </div>
  </li>
);
