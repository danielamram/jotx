import type React from "react";
import { useEffect } from "react";
import testContext from "../context";
import { getRuntime } from "../runtime";

type DebugProps = {
  value?: string;
  message?: string;
  logContext?: boolean;
};

/**
 * Debug component - Logs debug information
 *
 * @example
 * <Debug value="userData" message="User data after login" />
 * <Debug logContext={true} />
 */
export const Debug: React.FC<DebugProps> = ({ value, message, logContext }) => {
  useEffect(() => {
    const runtime = getRuntime();

    if (message) {
      runtime.debug(message);
    }

    if (value) {
      const valueToLog = testContext.get(value);
      runtime.debug(`${value}:`, valueToLog);
    }

    if (logContext) {
      runtime.logContext();
    }
  }, []);

  return null;
};
