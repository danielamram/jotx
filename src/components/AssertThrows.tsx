import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertThrows = ({ fn }: { fn: string }) => {
  useLayoutEffect(() => {
    const testFn = context.get(fn);
    getRuntime().assertThrows(testFn);
  }, []);
  return null;
};
