import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

export interface ActiveLinkChildProps {
  isActive: boolean;
}

export interface ActiveLinkProps extends LinkProps {
  children: (props: ActiveLinkChildProps) => ReactNode;
  nested?: boolean;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  nested,
  ...linkProps
}) => {
  const { asPath } = useRouter();
  const isActive =
    asPath === linkProps.href ||
    asPath === linkProps.as ||
    !!(
      nested &&
      typeof linkProps.href === 'string' &&
      asPath.startsWith(linkProps.href)
    );

  return <Link {...linkProps}>{children({ isActive })}</Link>;
};

ActiveLink.defaultProps = {
  nested: false,
};

export default ActiveLink;
