import React from 'react';
import { Zone as ZoneProps } from '@store/zone/types';
import { motion } from 'framer-motion';
import Effect from 'src/assets/effect.svg';
import Instrument from 'src/assets/instrument.svg';

const icons = (type: string) => {
  switch (type) {
    case 'effects':
      return <Effect />;

    case 'instrument':
      return <Instrument />;

    default:
      return null;
  }
};

export const ZoneList: React.FC = ({ children }) => (
  <ul className="zone-list">
    {children}
  </ul>
);

type Props = Partial<ZoneProps> & {
  onClick: () => void
}

export const Zone: React.FC<Props> = ({
  name, author, description, onClick, type,
}) => (
  <motion.li
    className="zone-item"
    layoutId={`zone-${name}-${author}`}
    onClick={onClick}
  >
    <aside>
      {icons(type || '')}
    </aside>
    <section>
      <h4>{name}</h4>
      <div>
        Created by:
        {' '}
        <span className="author">{author}</span>
      </div>
      {description && (
        <p>{description}</p>
      )}
    </section>
  </motion.li>
);
