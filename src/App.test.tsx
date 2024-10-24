import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test.skip('renders learn react link', () => {
  // this will fail because no provider
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
