const BASE_URL = process.env.NEXT_PUBLIC_WEB_URI as string;

type RequestInfo = Parameters<typeof fetch>[0];
type RequestInit = Parameters<typeof fetch>[1];

export type Fetcher = <T>(input: RequestInfo, init?: RequestInit) => Promise<T>;

export const fetcher: Fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
    console.log(`${BASE_URL}${input}`);
  return await fetch(`${BASE_URL}${input}`, init)
    .then()
    .then((response) => {
      if (response.status === 204) {
        return Promise.resolve();
      } else if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .catch((error) => Promise.reject(error));
};
