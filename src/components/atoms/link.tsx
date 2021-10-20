import React from 'react';
import NextLink, { LinkProps } from 'next/link';

interface Props extends React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>{
  button?: boolean;
  outline?: boolean;
  wide?: boolean;
}

export const Link: React.FC<LinkProps & Props> = ({
  children, button, outline, wide, onFocus, onMouseOver, onClick, ...rest
}) => {
  let className = button ? 'button ' : '';
  className += outline ? 'button-outline ' : '';
  className += wide ? 'button-wide ' : '';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NextLink {...rest} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={className}
        onMouseDown={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        role="link"
        tabIndex={0}
      >
        {children}
      </a>
    </NextLink>
  );
};
