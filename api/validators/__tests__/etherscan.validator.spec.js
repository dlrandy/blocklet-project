import { describe, expect, test } from 'vitest';
import etherscanValidate from '../etherscan.validator';

describe('Etherscan validator', () => {
  test('show one error when passing no params', () => {
    const errors = etherscanValidate();
    expect(errors.length).toBe(1);
  });
  test('show two errors when passing empty string and negative', () => {
    const errors = etherscanValidate('', '-1');
    expect(errors.length).toBe(2);
  });
});
