import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertFalse = ({ value }: { value: string }) => {
  useLayoutEffect(() => {
    const actualValue = context.get(value);
    getRuntime().assertFalse(actualValue);
  }, []);
  return null;
};
