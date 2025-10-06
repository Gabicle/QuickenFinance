import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, vi } from 'vitest';
import Button from './Button';

it('renders and responds to click', () => {
  const fn = vi.fn();
  render(<Button onClick={fn}>Click Me</Button>);
  fireEvent.click(screen.getByText(/click me/i));
  expect(fn).toHaveBeenCalled();
});
