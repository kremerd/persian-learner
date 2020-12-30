import { TrainingProgress } from '../../model/trainingProgress';

type SelectionStrategy = (progress: TrainingProgress) => number;

export default SelectionStrategy;
