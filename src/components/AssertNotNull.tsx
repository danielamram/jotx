import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertNotNull = ({ value }: { value: string }) => {
  useLayoutEffect(() => {
    const actualValue = context.get(value);
    getRuntime().assertNotNull(actualValue);
  }, []);
  return null;
};
