import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertCalled = ({
  spy,
  times,
}: {
  spy: string;
  times?: number;
}) => {
  useLayoutEffect(() => {
    const mockFn = context.get(spy);

    if (times !== undefined) {
      getRuntime().assertCalledTimes(mockFn, times);
    } else {
      getRuntime().assertCalled(mockFn);
    }
  }, []);
  return null;
};
