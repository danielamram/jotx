import { useLayoutEffect } from "react";

type AxiosMethod = "get" | "post" | "put" | "delete" | "patch";

type Props = {
  method: AxiosMethod;
  url: string;
  response: any;
  status?: number;
  headers?: Record<string, string>;
};

export const MockAxios = ({
  method,
  url,
  response,
  status = 200,
  headers = {},
}: Props) => {
  useLayoutEffect(() => {
    // This assumes axios is mocked in the test environment
    const axios = require("axios");

    axios[method].mockImplementation(async (requestUrl: string, data?: any) => {
      if (requestUrl === url || requestUrl.includes(url)) {
        console.log(`📡 Mock Axios ${method.toUpperCase()} hit for: ${url}`);
        return {
          data: response,
          status,
          headers,
          config: { url: requestUrl, data },
        };
      }

      throw new Error(
        `Unexpected ${method.toUpperCase()} request to ${requestUrl}`
      );
    });
  }, []);

  return null;
};
