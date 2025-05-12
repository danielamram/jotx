import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertNull = ({ value }: { value: string }) => {
  useLayoutEffect(() => {
    const actualValue = context.get(value);
    getRuntime().assertNull(actualValue);
  }, []);
  return null;
};
