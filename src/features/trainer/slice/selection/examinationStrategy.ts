import { getDifferenceFromNowInSeconds } from '../../../../util/time';
import { LangProgress } from '../../model/trainingProgress';
import configuration from './examinationStrategy.config';
import SelectionStrategy from './selectionStrategy';

const getPriority: SelectionStrategy = ({ score, lastTried }: LangProgress): number => {
  const gap = getDifferenceFromNowInSeconds(lastTried);

  if (score === configuration.score && gap > configuration.minGap) {
    return gap;
  } else {
    return 0;
  }
};

export default getPriority;
