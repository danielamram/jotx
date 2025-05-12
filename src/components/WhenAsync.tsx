import type React from "react";
import { useEffect } from "react";
import testContext from "../context";

type WhenAsyncProps = {
  fn: (context: typeof testContext) => Promise<any>;
  as: string;
  description?: string;
  timeout?: number;
};

/**
 * WhenAsync component - Executes asynchronous actions
 *
 * @example
 * <WhenAsync fn={(ctx) => fetchUserData(ctx.get("userId"))} as="userData" />
 */
export const WhenAsync: React.FC<WhenAsyncProps> = ({
  fn,
  as,
  description,
  timeout = 5000,
}) => {
  useEffect(() => {
    if (description) {
      console.log(`🔄 When async ${description}`);
    }

    let timeoutId: NodeJS.Timeout;

    const executeAsync = async () => {
      try {
        // Set a pending state
        testContext.set(`${as}_pending`, true);

        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error(`Async operation timed out after ${timeout}ms`));
          }, timeout);
        });

        // Race the actual operation against the timeout
        const result = await Promise.race([fn(testContext), timeoutPromise]);

        clearTimeout(timeoutId);
        testContext.set(as, result);
      } catch (error) {
        testContext.set(`${as}_error`, error);
        console.error(`❌ Error in WhenAsync action: ${error}`);
      } finally {
        testContext.set(`${as}_pending`, false);
        testContext.set(`${as}_completed`, true);
      }
    };

    void executeAsync();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
};
