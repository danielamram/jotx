import type React from "react";
import { useEffect } from "react";
import testContext from "../context";
import { getRuntime } from "../runtime";

type MockProps = {
  target: string;
  method: string;
  implementation?: (context: typeof testContext) => any;
  as?: string;
  returns?: any;
  resolves?: any;
  rejects?: any;
  description?: string;
};

/**
 * Mock component - Creates a mock function
 *
 * @example
 * <Mock target="userService" method="login" returns={{ success: true }} />
 * <Mock target="api" method="fetchData" resolves={{ data: [...] }} />
 * <Mock target="database" method="query" implementation={(ctx) => [...ctx.get("mockData")]} />
 */
export const Mock: React.FC<MockProps> = ({
  target,
  method,
  implementation,
  as,
  returns,
  resolves,
  rejects,
  description,
}) => {
  useEffect(() => {
    if (description) {
      console.log(`🎭 Mock: ${description}`);
    }

    const runtime = getRuntime();
    const targetObject = testContext.get(target);

    if (!targetObject) {
      console.error(`❌ Mock target "${target}" not found in test context`);
      return;
    }

    let mockImplementation: any;

    // Determine the mock implementation based on props
    if (implementation) {
      mockImplementation = (...args: any[]) =>
        // @ts-ignore
        implementation(testContext, ...args);
    } else if (returns !== undefined) {
      mockImplementation = () => returns;
    } else if (resolves !== undefined) {
      mockImplementation = () => Promise.resolve(resolves);
    } else if (rejects !== undefined) {
      mockImplementation = () => Promise.reject(rejects);
    }

    const mock = runtime.mock(targetObject, method, mockImplementation);

    // Store the mock in context if an alias is provided
    if (as) {
      testContext.set(as, mock);
    }
  }, []);

  return null;
};
