/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* istanbul ignore file */
import '@testing-library/jest-dom';

window.URL.createObjectURL = (file) =>
  `${window.location.origin}/${file.name}`;
