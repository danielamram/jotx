import type React from "react";
import { useEffect } from "react";
import testContext from "../context";

type WhenProps = {
  fn: (context: typeof testContext) => any;
  as: string;
  description?: string;
};

/**
 * When component - Executes the action being tested
 *
 * @example
 * <When fn={(ctx) => login(ctx.get("credentials"))} as="loginResult" />
 */
export const When: React.FC<WhenProps> = ({ fn, as, description }) => {
  useEffect(() => {
    if (description) {
      console.log(`🔄 When ${description}`);
    }

    try {
      const result = fn(testContext);
      testContext.set(as, result);
    } catch (error) {
      testContext.set(`${as}_error`, error);
      console.error(`❌ Error in When action: ${error}`);
    }
  }, []);

  return null;
};
