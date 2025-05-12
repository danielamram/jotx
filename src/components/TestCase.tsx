"use client";

import { jest } from "@jest/globals";
import type React from "react";
import { useLayoutEffect } from "react";
import testContext from "../context";
import { render } from "../render";
import { getRuntime } from "../runtime";
import { useTestContext } from "./TestSuite";

type TestCaseProps = {
  name: string;
  children: React.ReactNode;
  description?: string;
  timeout?: number;
  tags?: string[];
};

/**
 * TestCase component - Defines an individual test
 *
 * @example
 * <TestCase name="logs in successfully" description="User should be able to log in with valid credentials">
 *   <Given name="validCredentials" value={{ email: "user@example.com", password: "password123" }} />
 *   <When fn={() => login(validCredentials)} as="result" />
 *   <Then expect="result.success" toBe={true} />
 * </TestCase>
 */
export const TestCase: React.FC<TestCaseProps> = ({
  name,
  children,
  description,
  timeout,
  tags = [],
}) => {
  const { suiteName } = useTestContext();

  useLayoutEffect(() => {
    const runtime = getRuntime();

    const testCallback = async () => {
      // Clear context at the start of each test
      testContext.clear();

      if (description) {
        runtime.debug(`📝 ${description}`);
      }

      if (tags.length > 0) {
        runtime.debug(`🏷️ Tags: ${tags.join(", ")}`);
      }

      // Set a default value for the test name to make it available in the context
      testContext.set("__testName", name);
      testContext.set("__suiteName", suiteName);

      render(<>{children}</>);
    };

    // Handle timeout option
    if (timeout) {
      jest.setTimeout(timeout);
    }

    runtime.test(name, testCallback);
  }, []);

  return null;
};
