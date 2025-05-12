import { useLayoutEffect } from "react";
import { getRuntime } from "../runtime";

export const BeforeAll = ({ fn }: { fn: () => void | Promise<void> }) => {
  useLayoutEffect(() => {
    getRuntime().beforeAll(fn);
  }, []);
  return null;
};
