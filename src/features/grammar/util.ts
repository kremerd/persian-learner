export const endsWithAny = (string: string, ...suffixes: string[]): boolean => {
  return suffixes.some(suffix => string.endsWith(suffix));
};
