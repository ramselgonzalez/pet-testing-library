import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

test('renders sidebar with title', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/pet testing library/i);
  expect(headerElement).toBeInTheDocument();
});
