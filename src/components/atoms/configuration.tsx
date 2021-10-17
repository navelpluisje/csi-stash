import React from 'react';
import { Configuration as ConfigurationProps } from '@store/configuration.service';
import { motion } from 'framer-motion';

interface CLProps {}

export const ConfigurationList: React.FC<CLProps> = ({ children }) => (
  <ul className="configuration-list">
    {children}
  </ul>
);

type Props = Partial<ConfigurationProps> & {
  onClick: () => void
}

export const Configuration: React.FC<Props> = ({ name, author, description, onClick }) => (
  <motion.li
    className="configuration-item" 
    layoutId={`config-${name}-${author}`}
    onClick={onClick}
  >
    <h4>{name}</h4>
    <div>
      Created by:
      {' '}
      <span className="author">{author}</span>
    </div>
    {description && (
      <p>{description}</p>
    )}
  </motion.li>
);
