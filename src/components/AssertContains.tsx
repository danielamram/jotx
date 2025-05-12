import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertContains = ({
  value,
  expected,
}: {
  value: string;
  expected: any;
}) => {
  useLayoutEffect(() => {
    const actualValue = context.get(value);
    getRuntime().assertContains(actualValue, expected);
  }, []);
  return null;
};
