import type React from "react";
import { useEffect } from "react";
import testContext from "../context";

type GivenProps = {
  name: string;
  value: any;
  description?: string;
};

/**
 * Given component - Sets up test preconditions
 *
 * @example
 * <Given name="user" value={{ id: 1, name: "John" }} />
 * <Given name="isLoggedIn" value={true} />
 */
export const Given: React.FC<GivenProps> = ({ name, value, description }) => {
  useEffect(() => {
    if (description) {
      console.log(`📋 Given ${description}`);
    }

    testContext.set(name, value);
  }, []);

  return null;
};
