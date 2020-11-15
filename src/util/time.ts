import { differenceInSeconds } from 'date-fns';

export const getDifferenceFromNowInSeconds = (date: string | null): number => {
  if (date !== null) {
    return differenceInSeconds(new Date(), new Date(date));
  } else {
    return Number.POSITIVE_INFINITY;
  }
};
