import '@testing-library/jest-dom';

const React = require('react');

jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: any) => React.createElement('img', props),
  };
});

jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: any) => React.createElement('a', { href }, children),
  };
});
