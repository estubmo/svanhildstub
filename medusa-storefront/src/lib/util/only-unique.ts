export const onlyUnique = (value: unknown, index: number, self: Array<unknown>) =>
  self.indexOf(value) === index;
