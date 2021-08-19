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
  children, button, outline, wide, onFocus, onMouseOver, ...rest
}) => {
  let className = button ? 'button ' : '';
  className += outline ? 'button-outline ' : '';
  className += wide ? 'button-wide ' : '';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NextLink {...rest}>
      <a
        href="dummy"
        className={className}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        {children}
      </a>
    </NextLink>
  );
};
