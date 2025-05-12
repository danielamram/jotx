import type React from "react";
import { useEffect } from "react";
import testContext from "../context";

type VerifyProps = {
  spy: string;
  called?: boolean;
  calledTimes?: number;
  calledWith?: any[];
  calledOnce?: boolean;
  calledBefore?: string;
  calledAfter?: string;
  description?: string;
};

/**
 * Verify component - Verifies spy/mock interactions
 *
 * @example
 * <Verify spy="loginSpy" called={true} />
 * <Verify spy="fetchSpy" calledTimes={2} />
 * <Verify spy="createUserSpy" calledWith={["John", 30]} />
 */
export const Verify: React.FC<VerifyProps> = (props) => {
  useEffect(() => {
    const { spy, description } = props;

    if (description) {
      console.log(`🔍 Verify: ${description}`);
    }

    const mockFn = testContext.get(spy);

    if (!mockFn || typeof mockFn.mock !== "object") {
      console.error(
        `❌ Spy/mock "${spy}" not found in test context or is not a mock function`
      );
      return;
    }

    // Perform verifications based on props
    if ("called" in props) {
      if (props.called) {
        expect(mockFn).toHaveBeenCalled();
      } else {
        expect(mockFn).not.toHaveBeenCalled();
      }
    }

    if ("calledTimes" in props && props.calledTimes !== undefined) {
      expect(mockFn).toHaveBeenCalledTimes(props.calledTimes);
    }

    if ("calledWith" in props && props.calledWith) {
      expect(mockFn).toHaveBeenCalledWith(...props.calledWith);
    }

    if ("calledOnce" in props && props.calledOnce) {
      expect(mockFn).toHaveBeenCalledTimes(1);
    }

    if ("calledBefore" in props && props.calledBefore) {
      const otherMock = testContext.get(props.calledBefore);

      if (!otherMock || typeof otherMock.mock !== "object") {
        console.error(
          `❌ Comparison spy "${props.calledBefore}" not found or is not a mock function`
        );
        return;
      }

      const firstCallTime = mockFn.mock.invocationCallOrder[0];
      const otherFirstCallTime = otherMock.mock.invocationCallOrder[0];

      expect(firstCallTime).toBeLessThan(otherFirstCallTime);
    }

    if ("calledAfter" in props && props.calledAfter) {
      const otherMock = testContext.get(props.calledAfter);

      if (!otherMock || typeof otherMock.mock !== "object") {
        console.error(
          `❌ Comparison spy "${props.calledAfter}" not found or is not a mock function`
        );
        return;
      }

      const firstCallTime = mockFn.mock.invocationCallOrder[0];
      const otherFirstCallTime = otherMock.mock.invocationCallOrder[0];

      expect(firstCallTime).toBeGreaterThan(otherFirstCallTime);
    }
  }, []);

  return null;
};
