/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connect } from 'react-redux';
import { TrainingMode } from '../../model/trainingMode';
import { selectCurrentLangProgress, selectCurrentLanguage, selectCurrentLearningUnit } from '../../selectors';
import { fail, pass, select } from '../../slice';
import { Trainer } from './Trainer';

const mapStateToProps = (trainingMode: TrainingMode) => (state: any) => ({
  lang: selectCurrentLanguage(state),
  progress: selectCurrentLangProgress(state),
  unit: selectCurrentLearningUnit(state),
  trainingMode
});

const mapDispatchToProps = {
  fail: fail,
  next: select,
  pass: pass,
};

export const TrainerContainer = (trainingMode: TrainingMode) =>
  connect(mapStateToProps(trainingMode), mapDispatchToProps)(Trainer);
