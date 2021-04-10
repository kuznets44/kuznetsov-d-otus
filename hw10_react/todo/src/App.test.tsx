import { render, screen } from '@testing-library/react';
import App from './App';

test('should render the title containing "ToDo List"', () => {
  render(<App />);
  const linkElement = screen.getByText(/ToDo List/i);
  expect(linkElement).toBeInTheDocument();
});

