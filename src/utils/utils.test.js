import throttle from './throttle';
import { createQueryString } from './query';

describe('utils test', () => {
  test('throttle function should be called 5 times with 200ms of timeout during 1000ms', () => {
    jest.useFakeTimers();
    const fn = jest.fn();

    for (let i = 0; i < 100; i++) {
      throttle(fn, 200);
      jest.advanceTimersByTime(10);
    }

    expect(fn).toHaveBeenCalledTimes(5);
    jest.clearAllTimers();
  });

  test("createQueryString function should return ?query=abc&page=2 with params object { query: 'abc', page: 2 }", () => {
    const params = { query: 'abc', page: 2 };

    expect(createQueryString(params)).toBe('?query=abc&page=2');
  });

  test('createQueryString function should return empty string with params object { }', () => {
    const params = {};

    expect(createQueryString(params)).toBe('');
  });
});
