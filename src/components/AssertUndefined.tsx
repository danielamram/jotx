import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertUndefined = ({ value }: { value: string }) => {
  useLayoutEffect(() => {
    const actualValue = context.get(value);
    getRuntime().assertUndefined(actualValue);
  }, []);
  return null;
};
