import type React from "react";
import { useEffect } from "react";

type MockFetchProps = {
  url: string | RegExp;
  method?: string;
  response?: any;
  status?: number;
  headers?: Record<string, string>;
  delay?: number;
  description?: string;
};

/**
 * MockFetch component - Mocks fetch API responses
 *
 * @example
 * <MockFetch
 *   url="/api/users"
 *   response={[{ id: 1, name: "John" }]}
 *   status={200}
 * />
 */
export const MockFetch: React.FC<MockFetchProps> = ({
  url,
  method = "GET",
  response = {},
  status = 200,
  headers = {},
  delay = 0,
  description,
}) => {
  useEffect(() => {
    if (description) {
      console.log(`🌐 MockFetch: ${description}`);
    }

    const originalFetch = global.fetch;

    global.fetch = jest
      .fn()
      .mockImplementation(
        async (input: RequestInfo | URL, init?: RequestInit) => {
          const requestUrl =
            typeof input === "string"
              ? input
              : input instanceof URL
                ? input.toString()
                : input.url;
          const requestMethod = init?.method || "GET";

          const urlMatches =
            url instanceof RegExp
              ? url.test(requestUrl)
              : requestUrl === url || requestUrl.includes(url);

          const methodMatches =
            requestMethod.toUpperCase() === method.toUpperCase();

          if (urlMatches && methodMatches) {
            console.log(`📡 Mock FETCH hit: ${method} ${requestUrl}`);

            // Simulate network delay if specified
            if (delay > 0) {
              await new Promise((resolve) => setTimeout(resolve, delay));
            }

            const responseBody =
              typeof response === "string"
                ? response
                : JSON.stringify(response);

            // @ts-ignore
            return {
              ok: status >= 200 && status < 300,
              status,
              statusText: status === 200 ? "OK" : `${status}`,
              headers: new Headers(headers),
              json: async () => response,
              text: async () => responseBody,
              blob: async () =>
                new Blob([responseBody], { type: "application/json" }),
              arrayBuffer: async () =>
                new TextEncoder().encode(responseBody).buffer,
              formData: async () => {
                throw new Error("formData() is not implemented in mock");
              },
              clone: function () {
                return this;
              },
            } as Response;
          }

          // Fall through to original fetch for non-mocked URLs
          return originalFetch(input, init);
        }
      );

    return () => {
      global.fetch = originalFetch;
    };
  }, [description, url, method, response, status, headers, delay]);

  return null;
};
