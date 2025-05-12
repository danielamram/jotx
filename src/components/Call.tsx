import { useLayoutEffect } from "react";
// @ts-ignore
import context from "./context";

type Props = {
  fn: () => any;
  as: string;
};

export const Call = ({ fn, as }: Props) => {
  useLayoutEffect(() => {
    const result = fn();
    context.set(as, result);
  }, []);

  return null;
};
