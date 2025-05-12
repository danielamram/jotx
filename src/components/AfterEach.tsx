import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";

export const AfterEach = ({ fn }: { fn: () => void | Promise<void> }) => {
  useLayoutEffect(() => {
    getRuntime().afterEach(fn);
  }, []);
  return null;
};
