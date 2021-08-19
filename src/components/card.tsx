import React from 'react';

interface CardImage {
  src: string;
  alt: string;
}

interface Props {
  image?: CardImage|undefined;
  title: string;
  subtitle?: string|undefined;
}

export const Card: React.FC<Props> = ({
  image, title, subtitle, children,
}) => (
  <article className="card">
    <header>
      <h4>{title}</h4>
      {subtitle && <h5>{subtitle}</h5>}
    </header>
    {image && (
      <picture>
        <img
          src={image.src}
          alt={image.alt}
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          onError={(event) => { event.target.src = '/images/controller.png'; }}
        />
      </picture>
    )}
    {children && <section className="content">{children}</section>}
  </article>
);
