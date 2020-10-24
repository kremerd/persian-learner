import selectRandom from './selectRandom';

describe('selectRandom', () => {
  const id = (x: number): number => x;

  it('should assign probability events with measure proportional to the elements weight', () => {
    expect(selectRandom([1, 3, 6], id, 0)).toEqual(1);
    expect(selectRandom([1, 3, 6], id, 0.1)).toEqual(1);

    expect(selectRandom([1, 3, 6], id, 0.11)).toEqual(3);
    expect(selectRandom([1, 3, 6], id, 0.4)).toEqual(3);

    expect(selectRandom([1, 3, 6], id, 0.41)).toEqual(6);
    expect(selectRandom([1, 3, 6], id, 1)).toEqual(6);
  });

  it('should return null if an empty array was given', () => {
    expect(selectRandom([], id, 0)).toEqual(null);
  });

  it('should return null if all elements have zero weight', () => {
    expect(selectRandom([1, 2, 3], () => 0, 0)).toEqual(null);
  });

  it('should map complex objects to weights using the given projection', () => {
    const array = [
      { id: 1, foo: 8, bar: 1 },
      { id: 2, foo: 1, bar: 1 },
      { id: 3, foo: 1, bar: 8 },
    ];

    expect(selectRandom(array, el => el.foo, 0.5)?.id).toEqual(1);
    expect(selectRandom(array, el => el.bar, 0.5)?.id).toEqual(3);
  });
});