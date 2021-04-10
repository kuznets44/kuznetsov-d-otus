import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render the title containing "Weather Forecast"', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather Forecast/i);
  expect(linkElement).toBeTruthy();
})