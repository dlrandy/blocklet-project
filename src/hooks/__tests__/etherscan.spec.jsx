import { afterEach, describe, expect, test, vi } from 'vitest';
import { act, render } from '@testing-library/react';

import { getEtherscanData as getEtherscanDataMocking } from '../../utils/get-etherscan';
import { useEtherscanQuery } from '../etherscan';

vi.mock('../../utils/get-etherscan', () => {
  return {
    getEtherscanData: vi.fn(),
  };
});
getEtherscanDataMocking.mockResolvedValueOnce({ data: [{ id: 'm1' }], pages: 10 });
describe('Etherscan Hooks test', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Should not call getEtherscanData api when no passing in address', () => {
    let result;
    function TestComponent() {
      result = useEtherscanQuery({});
      return null;
    }
    render(<TestComponent />);
    const { data, error, loading } = result;
    expect(data).toEqual({});
    expect(error).toBe(null);
    expect(loading).toBe(false);
  });
  test('Should  call getEtherscanData api when  passing in address and page', async () => {
    let result;

    function TestComponent() {
      result = useEtherscanQuery({ address: '2323', page: '1' });
      const { loading, data } = result;

      return loading ? (
        <span data-testid="loading">loading</span>
      ) : (
        <div data-testid="content">{JSON.stringify(data)}</div>
      );
    }
    await act(async () => {
      render(<TestComponent />);
    });

    const { error, loading, data } = result;

    expect(getEtherscanDataMocking).toBeCalledTimes(1);
    expect(getEtherscanDataMocking).toHaveBeenCalledWith('2323', '1');

    expect(loading).toBe(false);
    expect(data).toEqual({ data: [{ id: 'm1' }], pages: 10 });
    expect(error).toBe(null);
  });
});
