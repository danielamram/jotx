/**
 * Enhanced TestRuntime interface with better error handling and more intuitive API
 */
import type { jest } from "@jest/globals";

export type TestRuntime = {
  // Test structure
  suite: (name: string, fn: () => void) => void;
  test: (name: string, fn: () => void | Promise<void>) => void;

  // Assertions with better error messages
  assert: (condition: boolean, message?: string) => void;
  assertEqual: <T>(actual: T, expected: T, message?: string) => void;
  assertNotEqual: <T>(actual: T, expected: T, message?: string) => void;
  assertTrue: (value: any, message?: string) => void;
  assertFalse: (value: any, message?: string) => void;
  assertDefined: (value: any, message?: string) => void;
  assertUndefined: (value: any, message?: string) => void;
  assertNull: (value: any, message?: string) => void;
  assertNotNull: (value: any, message?: string) => void;
  assertContains: <T>(collection: T[], item: T, message?: string) => void;
  assertMatches: (value: string, pattern: RegExp, message?: string) => void;
  assertThrows: (fn: () => any, errorType?: any, message?: string) => void;
  assertRejects: (
    fn: () => Promise<any>,
    errorType?: any,
    message?: string
  ) => Promise<void>;
  assertCalledWith: (mockFn: jest.Mock, ...args: any[]) => void;
  assertCalled: (mockFn: jest.Mock) => void;
  assertCalledTimes: (mockFn: jest.Mock, times: number) => void;

  // Spying and mocking with improved API
  spyOn: <T extends object, M extends keyof T>(
    object: T,
    method: M & string
    // @ts-ignore
  ) => jest.SpyInstance;

  mock: <T extends object, M extends keyof T>(
    object: T,
    method: M & string,
    implementation?: (...args: any[]) => any
  ) => jest.Mock;

  // Hooks with better typing
  beforeEach: (fn: () => void | Promise<void>) => void;
  afterEach: (fn: () => void | Promise<void>) => void;
  beforeAll: (fn: () => void | Promise<void>) => void;
  afterAll: (fn: () => void | Promise<void>) => void;

  // Test control with better naming
  skip: (name: string, fn: () => void | Promise<void>) => void;
  only: (name: string, fn: () => void | Promise<void>) => void;

  // Debugging helpers
  debug: (...args: any[]) => void;
  logContext: () => void;
};

let _runtime: TestRuntime | undefined;

export function setRuntime(rt: TestRuntime) {
  _runtime = rt;
}

export function getRuntime(): TestRuntime {
  if (!_runtime)
    throw new Error(
      "Test runtime not configured. Make sure to call setRuntime() before running tests."
    );
  return _runtime;
}
