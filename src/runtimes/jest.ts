import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import testContext from "../context";
import type { TestRuntime } from "../runtime";

/**
 * Enhanced Jest runtime with better error messages and debugging capabilities
 */
export const jestRuntime: TestRuntime = {
  suite: (name, fn) => describe(name, fn),
  test: (name, fn) => it(name, fn),

  // Core assertions
  assert: (condition) => expect(condition).toBe(true),
  assertEqual: (actual, expected) => expect(actual).toEqual(expected),
  assertNotEqual: (actual, expected) => expect(actual).not.toEqual(expected),
  assertTrue: (value) => expect(value).toBe(true),
  assertFalse: (value) => expect(value).toBe(false),
  assertDefined: (value) => expect(value).toBeDefined(),
  assertUndefined: (value) => expect(value).toBeUndefined(),
  assertNull: (value) => expect(value).toBeNull(),
  assertNotNull: (value) => expect(value).not.toBeNull(),
  assertContains: (collection, item) => expect(collection).toContain(item),
  assertMatches: (value, pattern) => expect(value).toMatch(pattern),
  assertCalledWith: (mockFn, ...args) =>
    expect(mockFn).toHaveBeenCalledWith(...args),
  assertCalled: (mockFn) => expect(mockFn).toHaveBeenCalled(),
  assertCalledTimes: (mockFn, times) =>
    expect(mockFn).toHaveBeenCalledTimes(times),

  // Exception testing
  assertThrows: (fn, errorType) => {
    if (errorType) {
      expect(fn).toThrow(errorType);
    } else {
      expect(fn).toThrow();
    }
  },

  assertRejects: async (fn, errorType) => {
    if (errorType) {
      await expect(fn()).rejects.toThrow(errorType);
    } else {
      await expect(fn()).rejects.toBeDefined();
    }
  },

  // Spying and mocking
  // @ts-ignore
  spyOn: (object, method) => jest.spyOn(object, method),

  mock: (object, method, implementation) => {
    // @ts-ignore
    const mock = jest.fn(implementation || object[method]);
    const original = object[method];
    object[method] = mock as any;

    // Restore original after tests
    afterEach(() => {
      object[method] = original;
    });

    return mock;
  },

  // Lifecycle hooks
  beforeEach: (fn) => beforeEach(fn),
  afterEach: (fn) => afterEach(fn),
  beforeAll: (fn) => beforeAll(fn),
  afterAll: (fn) => afterAll(fn),

  // Test control
  skip: (name, fn) => it.skip(name, fn),
  only: (name, fn) => it.only(name, fn),

  // Debugging helpers
  debug: (...args) => console.log("\n🔍 DEBUG:", ...args),
  logContext: () => console.log("\n📊 TEST CONTEXT:", testContext.entries()),
};
