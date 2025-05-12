import type React from "react";
import { useEffect } from "react";

type WaitProps = {
  ms: number;
  description?: string;
};

/**
 * Wait component - Pauses test execution
 *
 * @example
 * <Wait ms={500} description="Wait for animation to complete" />
 */
export const Wait: React.FC<WaitProps> = ({ ms, description }) => {
  useEffect(() => {
    if (description) {
      console.log(`⏱️ Wait: ${description} (${ms}ms)`);
    }

    const timer = setTimeout(() => {
      // This component just waits, it doesn't do anything after waiting
    }, ms);

    return () => clearTimeout(timer);
  }, []);

  return null;
};
