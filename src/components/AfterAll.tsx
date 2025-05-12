import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";

export const AfterAll = ({ fn }: { fn: () => void | Promise<void> }) => {
  useLayoutEffect(() => {
    getRuntime().afterAll(fn);
  }, []);
  return null;
};
