import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

export interface ActiveLinkChildProps {
  isActive: boolean;
}

export interface ActiveLinkProps extends LinkProps {
  children: (props: ActiveLinkChildProps) => ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const isActive = asPath === props.href || asPath === props.as;

  return <Link {...props}>{children({ isActive })}</Link>;
};

export default ActiveLink;
