import type React from "react";
import { render } from "../render";
import { getRuntime } from "../runtime";

export const OnlyTest = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  getRuntime().only(name, () => {
    render(<>{children}</>);
  });
  return null;
};
