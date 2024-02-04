export type Action<T = void> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => T;
};
