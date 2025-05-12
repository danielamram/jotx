import type React from "react";
import { useEffect } from "react";
import testContext from "../context";
import { getRuntime } from "../runtime";

type ThenProps = {
  expect: string;
  toBe?: any;
  toEqual?: any;
  toContain?: any;
  toMatch?: RegExp;
  toBeDefined?: boolean;
  toBeUndefined?: boolean;
  toBeNull?: boolean;
  toBeTrue?: boolean;
  toBeFalse?: boolean;
  toThrow?: boolean;
  description?: string;
};

/**
 * Then component - Asserts the expected outcome
 *
 * @example
 * <Then expect="loginResult.success" toBe={true} />
 * <Then expect="user.name" toEqual="John Doe" />
 * <Then expect="errors" toContain="Invalid email" />
 */
export const Then: React.FC<ThenProps> = (props) => {
  useEffect(() => {
    const { expect: path, description } = props;
    const runtime = getRuntime();

    if (description) {
      console.log(`✅ Then ${description}`);
    }

    // Get the actual value from context
    const actual = testContext.get(path);

    // Determine which assertion to use based on props
    if ("toBe" in props) {
      runtime.assertEqual(
        actual,
        props.toBe,
        `Expected ${path} to be ${props.toBe}`
      );
    }

    if ("toEqual" in props) {
      runtime.assertEqual(
        actual,
        props.toEqual,
        `Expected ${path} to equal ${props.toEqual}`
      );
    }

    if ("toContain" in props) {
      runtime.assertContains(
        actual,
        props.toContain,
        `Expected ${path} to contain ${props.toContain}`
      );
    }

    if ("toMatch" in props && props.toMatch instanceof RegExp) {
      runtime.assertMatches(
        actual,
        props.toMatch,
        `Expected ${path} to match ${props.toMatch}`
      );
    }

    if ("toBeDefined" in props && props.toBeDefined) {
      runtime.assertDefined(actual, `Expected ${path} to be defined`);
    }

    if ("toBeUndefined" in props && props.toBeUndefined) {
      runtime.assertUndefined(actual, `Expected ${path} to be undefined`);
    }

    if ("toBeNull" in props && props.toBeNull) {
      runtime.assertNull(actual, `Expected ${path} to be null`);
    }

    if ("toBeTrue" in props && props.toBeTrue) {
      runtime.assertTrue(actual, `Expected ${path} to be true`);
    }

    if ("toBeFalse" in props && props.toBeFalse) {
      runtime.assertFalse(actual, `Expected ${path} to be false`);
    }

    if ("toThrow" in props && props.toThrow) {
      runtime.assertThrows(actual, undefined, `Expected ${path} to throw`);
    }
  }, []);

  return null;
};
