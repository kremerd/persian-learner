import { connect } from 'react-redux';
import { selectCurrentLearningUnit, selectCurrentTrainingProgress } from '../../selectors';
import { failDe, passDe, selectDe } from '../../slice';
import { TrainGerman } from './TrainGerman';

const mapStateToProps = (state: any): any => ({
  // TODO: selection can be null
  progress: selectCurrentTrainingProgress(state),
  unit: selectCurrentLearningUnit(state),
});

const mapDispatchToProps = {
  pass: passDe,
  fail: failDe,
  proceed: selectDe,
};

export const TrainGermanContainer =
  connect(mapStateToProps, mapDispatchToProps)(TrainGerman);