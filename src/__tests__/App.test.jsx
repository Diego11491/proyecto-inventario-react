import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('muestra el texto de bienvenida', () => {
    render(<App />);
    expect(screen.getByText(/bienvenido/i)).toBeDefined();
  });
});
