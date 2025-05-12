import { useLayoutEffect } from "react";
import context from "./context.js";

type Props = {
  fn: () => Promise<any>;
  as: string;
};

export const AsyncCall = ({ fn, as }: Props) => {
  useLayoutEffect(() => {
    const executeAsync = async () => {
      try {
        const result = await fn();
        context.set(as, result);
      } catch (error) {
        context.set(`${as}_error`, error);
      }
    };

    void executeAsync();
  }, []);

  return null;
};
