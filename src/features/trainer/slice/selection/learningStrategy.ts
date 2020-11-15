import { getDifferenceFromNowInSeconds } from '../../../../util/time';
import { LangProgress } from '../../model/trainingProgress';
import configuration from './learningStrategy.config';
import SelectionStrategy from './selectionStrategy';

const getPriority: SelectionStrategy = ({ score, lastTried }: LangProgress): number => {
  const config = configuration.find(c => c.score === score);
  const gap = getDifferenceFromNowInSeconds(lastTried);

  if (config !== undefined && gap > config.minGap) {
    return config.frequency;
  } else {
    return 0;
  }
};

export default getPriority;
