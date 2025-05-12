import type React from "react";
import { createContext, useContext, useLayoutEffect } from "react";
import testContext from "../context";
import { render } from "../render";
import { getRuntime } from "../runtime";

// Create a context to share test state
export const TestContext = createContext<{
  suiteName: string;
  contextValues: typeof testContext;
}>({
  suiteName: "",
  contextValues: testContext,
});

export const useTestContext = () => useContext(TestContext);

type TestSuiteProps = {
  name: string;
  children: React.ReactNode;
  description?: string;
  tags?: string[];
};

/**
 * TestSuite component - Groups related tests together
 *
 * @example
 * <TestSuite name="User Authentication" description="Tests for user login and registration">
 *   <TestCase name="logs in successfully">...</TestCase>
 * </TestSuite>
 */
export const TestSuite: React.FC<TestSuiteProps> = ({
  name,
  children,
  description,
  tags = [],
}) => {
  const runtime = getRuntime();

  useLayoutEffect(() => {
    testContext.clear();

    const suiteCallback = () => {
      if (description) {
        runtime.debug(`📝 ${description}`);
      }

      if (tags.length > 0) {
        runtime.debug(`🏷️ Tags: ${tags.join(", ")}`);
      }

      render(
        <TestContext.Provider
          value={{ suiteName: name, contextValues: testContext }}
        >
          {children}
        </TestContext.Provider>
      );
    };

    runtime.suite(name, suiteCallback);
  }, []);

  return null;
};
