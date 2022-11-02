import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('Loading tests', () => {
  test('Should not show modal on default', () => {
    render(
      <div data-testid="test-container">
        <Loading />
      </div>
    );
    expect(screen.getByTestId('test-container')).toBeDefined();
    expect(screen.getByTestId('test-container').innerHTML).toBe('');
    expect(screen.queryByRole('presentation')).toBeNull();
  });
  test('Should show modal When open prop is true', () => {
    render(
      <div data-testid="test-container2">
        <Loading open />
      </div>
    );
    expect(screen.getByTestId('test-container2')).toBeDefined();
    expect(screen.getByTestId('test-container2').innerHTML).toBe('');
    expect(screen.queryByRole('presentation').querySelector('circle')).toBeDefined();
  });
});
