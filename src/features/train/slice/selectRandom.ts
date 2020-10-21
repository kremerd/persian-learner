const selectRandom = <T> (
  elements: T[],
  weightProjection: (el: T) => number,
  rand = Math.random()
): T | null => {
  const weights = elements.map(el => weightProjection(el));
  const elementUpperBounds = buildPartialSums(weights);
  const totalWeight = getLast(elementUpperBounds, 0);

  if (totalWeight === 0) {
    return null;
  }

  const selectedValue = rand * totalWeight;
  const selectedIndex = elementUpperBounds.findIndex(sum => selectedValue <= sum);
  return elements[selectedIndex];
};

const buildPartialSums = (values: number[]): number[] => {
  const partialSums = new Array(values.length);
  let ongoingSum = 0;
  for (let i = 0; i < values.length; i++) {
    ongoingSum += values[i];
    partialSums[i] = ongoingSum;
  }
  return partialSums;
};

const getLast = <T> (array: T[], defaultValue: T): T => {
  if (array.length > 0) {
    return array.slice(-1)[0];
  } else {
    return defaultValue;
  }
};

export default selectRandom;