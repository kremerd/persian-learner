import { getDifferenceFromNowInSeconds } from '../../../../util/time';
import { TrainingProgress } from '../../model/trainingProgress';
import configuration from './examinationStrategy.config';
import SelectionStrategy from './selectionStrategy';

const getPriority: SelectionStrategy = ({ score, lastTried }: TrainingProgress): number => {
  const gap = getDifferenceFromNowInSeconds(lastTried);

  if (score === configuration.score && gap > configuration.minGap) {
    return gap;
  } else {
    return 0;
  }
};

export default getPriority;
