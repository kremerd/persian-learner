import { TrainingMode } from '../../model/trainingMode';
import examinationStrategy from './examinationStrategy';
import learningStrategy from './learningStrategy';
import SelectionStrategy from './selectionStrategy';

const selectionStrategyFactory = (mode: TrainingMode): SelectionStrategy => {
  switch (mode) {
  case TrainingMode.Examination:
    return examinationStrategy;
  case TrainingMode.Learning:
    return learningStrategy;
  default:
    throw new Error(`Unknown mode ${mode}`);
  }
};

export default selectionStrategyFactory;
