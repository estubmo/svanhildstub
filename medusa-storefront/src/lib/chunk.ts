export function chunk<T>(input: Array<T>, size: number): Array<Array<T>> {
  return input.reduce((arr: Array<Array<T>>, item: T, idx: number) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
}
