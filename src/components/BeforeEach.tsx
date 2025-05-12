import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";

export const BeforeEach = ({ fn }: { fn: () => void | Promise<void> }) => {
  useLayoutEffect(() => {
    getRuntime().beforeEach(fn);
  }, []);
  return null;
};
