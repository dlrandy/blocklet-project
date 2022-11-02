/* eslint-disable no-void */
/* eslint-disable no-console */
import { afterEach, describe, expect, vi, test } from 'vitest';
import { fireEvent, render, cleanup } from '@testing-library/react';

import SearchForm from '../search-form';

describe('SearchForm tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });
  test('Should show form with address input, page input and submit button', () => {
    const { getByTestId, getByText } = render(<SearchForm onSubmit={() => void 0} />);
    const address = getByTestId('etherscan-address');
    const page = getByTestId('etherscan-page');
    const search = getByText(/search/i);
    expect(address).toBeDefined();
    expect(page).toBeDefined();
    expect(search).toBeDefined();
  });
  test('Should be disabled when searching etherscan data', () => {
    const { getByTestId, getByText } = render(<SearchForm onSubmit={() => void 0} />);
    const address = getByTestId('etherscan-address');
    const page = getByTestId('etherscan-page');
    const search = getByText(/search/i);

    fireEvent.change(address, { target: { value: 'ssss' } });
    fireEvent.change(page, { target: { value: '1' } });
    fireEvent.click(search);
    expect(search.disabled).toBe(true);
  });
  test('Should call onSubmit prop function', () => {
    const mock = vi.fn().mockImplementation(() => void 0);
    const { getByTestId, getByText } = render(<SearchForm onSubmit={mock} />);
    const address = getByTestId('etherscan-address');
    const page = getByTestId('etherscan-page');
    const search = getByText(/search/i);

    fireEvent.change(address, { target: { value: 'ssss' } });
    fireEvent.change(page, { target: { value: '1' } });
    fireEvent.click(search);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
