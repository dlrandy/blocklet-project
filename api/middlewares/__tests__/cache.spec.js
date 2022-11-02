import { afterEach, describe, expect, test, vi } from 'vitest';
import cache from '../cache';

class Redis {
  constructor() {
    this.cache = {};
  }

  set(key, data) {
    this.cache[key] = data;
  }

  get(key, callback) {
    callback(null, this.cache[key] || null);
  }
}

describe('Cache Middleware', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('call next when redis not cache the data', () => {
    const req = {};
    const next = vi.fn();
    const res = { json: vi.fn(), status: vi.fn() };
    cache.cacheFactory(() => 'redis--key', new Redis())(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  test('call redis cache when redis cache the data', () => {
    const req = {};
    const next = vi.fn();
    const res = { json: vi.fn(), status: vi.fn() };
    const redis = new Redis();
    redis.set('redis--key', 123123);
    cache.cacheFactory(() => 'redis--key', redis)(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(123123);
  });
});
