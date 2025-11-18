import { render, screen } from '@testing-library/react';
import React from 'react';

function Hello({ name }: { name: string }) {
  return <div>hello {name}</div>;
}

test('renders greeting', () => {
  render(<Hello name="saeed" />);
  expect(screen.getByText(/hello saeed/)).toBeInTheDocument();
});
