import React from 'react';
import type { NextPage } from 'next';

const UnAuthorized: NextPage = () => {
  return (
    <h1>
      Unauthorized - You do not have the priviledges required to view the page.
    </h1>
  );
};

export default UnAuthorized;
