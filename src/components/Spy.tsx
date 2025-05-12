import type React from "react";
import { useEffect } from "react";
import testContext from "../context";
import { getRuntime } from "../runtime";

type SpyProps = {
  target: string;
  method: string;
  as: string;
  description?: string;
};

/**
 * Spy component - Creates a spy on an object method
 *
 * @example
 * <Spy target="userService" method="login" as="loginSpy" />
 */
export const Spy: React.FC<SpyProps> = ({
  target,
  method,
  as,
  description,
}) => {
  useEffect(() => {
    if (description) {
      console.log(`👁️ Spy: ${description}`);
    }

    const runtime = getRuntime();
    const targetObject = testContext.get(target);

    if (!targetObject) {
      console.error(`❌ Spy target "${target}" not found in test context`);
      return;
    }

    const spy = runtime.spyOn(targetObject, method);
    testContext.set(as, spy);
  }, []);

  return null;
};
