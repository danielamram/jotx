import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertCalledWith = ({
  spy,
  args,
}: {
  spy: string;
  args: any[];
}) => {
  useLayoutEffect(() => {
    const mockFn = context.get(spy);
    getRuntime().assertCalledWith(mockFn, ...args);
  }, []);
  return null;
};
