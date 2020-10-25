export const selectRandomEntry = <T> (array: T[]): T => {
  const selectedIndex = Math.floor(Math.random() * array.length);
  return array[selectedIndex];
};
