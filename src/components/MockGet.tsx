import { useLayoutEffect } from "react";

const mockedAxios = {
  get: async () => ({ data: null }),
  post: async () => ({}),
  put: async () => ({}),
  delete: async () => ({}),
  create: () => mockedAxios,
};

type Props = {
  url: string;
  response: any;
};

export const MockGet = ({ url, response }: Props) => {
  useLayoutEffect(() => {
    mockedAxios.get = async () => {
      console.log(`📡 Mock GET hit for: ${url}`);
      return { data: response };
    };
  }, []);
  return null;
};
