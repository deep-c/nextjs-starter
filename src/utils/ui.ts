// eslint-disable-next-line import/prefer-default-export
export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ');
