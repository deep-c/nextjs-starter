/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-anonymous-default-export */
import { loadEnvConfig } from '@next/env';

export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
