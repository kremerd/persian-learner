export const min = <T> (array: T[], project: (el: T) => number): number => {
  return Math.min(...array.map(el => project(el)));
};