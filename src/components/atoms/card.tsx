import React from 'react';
import { motion } from 'framer-motion';

interface CardImage {
  src: string;
  alt: string;
}

interface Props {
  image?: CardImage|undefined;
  title: string;
  subtitle?: string|undefined;
  horizontal?: boolean;
  small?: boolean;
}

export const Card: React.FC<Props> = ({
  image, title, subtitle, children, horizontal, small,
}) => (
  <motion.article
    className={`card${horizontal ? ' horizontal' : ''}${small ? ' small' : ''}`}
    layoutId={`card-${title}=${subtitle}`}
  >
    <header>
      <h4>{title}</h4>
      {subtitle && <h5>{subtitle}</h5>}
    </header>
    {image && (
      <picture>
        <img
          src={image.src}
          alt={image.alt}
          // eslint-disable-next-line no-param-reassign
          onError={(event) => { (event.target as HTMLImageElement).src = '/images/controller.png'; }}
        />
      </picture>
    )}
    {children && <section className="content">{children}</section>}
  </motion.article>
);
