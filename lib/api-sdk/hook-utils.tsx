import { NextApiRequest } from "next";
import { useUpdateEffect } from "react-use";
import { mutate } from "swr";

export type ResourceHookParams<T> = {
  defaultOnError?: (errorMsg: string) => void;
  initialModel?: T;
  param?: ResourceID;
  req?: NextApiRequest;
};

export type SelfHookParams<T> = {
  defaultOnError?: (errorMsg: string) => void;
  initialModel?: T;
  req?: NextApiRequest;
};

export type ListHookParams<T> = {
  defaultOnError?: (errorMsg: string) => void;
  initialModels?: T[];
};

export function fetcherToSVRHandler(fetcher) {
  return async () => {
    const res = await fetcher();
    if (res.success) {
      return res.success;
    }
    throw res.error;
  };
}

export function useErrorHandler(handler, error) {
  useUpdateEffect(() => {
    if (error && error != "") handler(error), [error];
  });
}

// LOOK AT THIS HIGHER ORDER FUNCTION
export function fetchWithMutation<T extends (...args: any[]) => any>(
  func: T,
  defaultOnError,
  resourceRoute
): (...funcArgs: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    return func(...args).then(res => {
      if (res.success !== undefined) {
        mutate(resourceRoute, res.success, true);
      }
      if (res.error) defaultOnError(res.error);
    });
  };
}
