import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertTrue = ({ value }: { value: string }) => {
  useLayoutEffect(() => {
    const actualValue = context.get(value);
    getRuntime().assertTrue(actualValue);
  }, []);
  return null;
};
