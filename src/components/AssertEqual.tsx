import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";
import context from "./context.js";

export const AssertEqual = ({
  actual,
  expected,
}: {
  actual: string;
  expected: any;
}) => {
  useLayoutEffect(() => {
    const value = context.get(actual);
    getRuntime().assertEqual(value, expected);
  }, []);
  return null;
};
