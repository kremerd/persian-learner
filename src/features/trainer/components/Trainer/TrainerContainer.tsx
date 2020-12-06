/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { connect } from 'react-redux';
import { TrainingMode } from '../../model/trainingMode';
import { selectCurrentTrainingUnit } from '../../selectors';
import { fail, pass, select } from '../../slice';
import { Trainer } from './Trainer';

const mapStateToProps = (trainingMode: TrainingMode) => (state: any) => ({
  unit: selectCurrentTrainingUnit(state),
  trainingMode
});

const mapDispatchToProps = {
  fail: fail,
  next: select,
  pass: pass,
};

export const TrainerContainer = (trainingMode: TrainingMode) =>
  connect(mapStateToProps(trainingMode), mapDispatchToProps)(Trainer);
