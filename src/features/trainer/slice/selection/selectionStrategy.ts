import { LangProgress } from '../../model/trainingProgress';

type SelectionStrategy = (progress: LangProgress) => number;

export default SelectionStrategy;
