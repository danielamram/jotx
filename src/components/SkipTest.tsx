import type React from "react";
import { render } from "../render";
import { getRuntime } from "../runtime";

export const SkipTest = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  getRuntime().skip(name, () => {
    render(<>{children}</>);
  });
  return null;
};
