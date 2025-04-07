// tests/HomePage.test.js

import { render, screen } from '@testing-library/react';
import HomePage from '../src/app/page';

describe('HomePage Component', () => {
  test('باید متن خوش آمدید را نمایش دهد', () => {
    render(<HomePage />);
    const heading = screen.getByText(/به سایت بوم گردی خوش آمدید/i);
    expect(heading).toBeInTheDocument();
  });
});
