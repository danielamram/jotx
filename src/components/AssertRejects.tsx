import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertRejects = ({ fn }: { fn: string }) => {
  useLayoutEffect(() => {
    const testFn = context.get(fn);
    void getRuntime().assertRejects(testFn);
  }, []);
  return null;
};
