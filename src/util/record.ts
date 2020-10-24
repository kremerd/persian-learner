export const getKey = <K extends string | number | symbol, T>
  (key: K | null | undefined, record: Record<K, T>): T | null =>
{
  if (key === null || key === undefined) {
    return null;
  }
  const result = record[key];
  if (result === undefined) {
    return null;
  }
  return result;
};