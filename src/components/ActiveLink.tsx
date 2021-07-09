import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

export interface ActiveLinkChildProps {
  isActive: boolean;
}

export interface ActiveLinkProps extends LinkProps {
  nested?: boolean;
  children: (props: ActiveLinkChildProps) => ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  nested,
  ...props
}) => {
  const { asPath } = useRouter();
  const isActive =
    asPath === props.href ||
    asPath === props.as ||
    !!(
      nested &&
      typeof props.href === 'string' &&
      asPath.startsWith(props.href)
    );

  return <Link {...props}>{children({ isActive })}</Link>;
};

ActiveLink.defaultProps = {
  nested: false,
};

export default ActiveLink;
