import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoForm from '.';

const performRender = () => render(<DemoForm />);

describe('DemoForm', () => {
  it('should render two text fields and a submit button', () => {
    performRender();

    expect(screen.getByTestId('lastName-input')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
