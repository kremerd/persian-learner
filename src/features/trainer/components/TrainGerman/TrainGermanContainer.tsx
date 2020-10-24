import { connect } from 'react-redux';
import { selectTrainingProgress, selectTrainingUnit } from '../../selectors';
import { failDe, passDe, selectDe } from '../../slice';
import { TrainGerman } from './TrainGerman';

const mapStateToProps = (state: any): any => ({
  // TODO: selection can be null
  progress: selectTrainingProgress(state),
  unit: selectTrainingUnit(state)
});

const mapDispatchToProps = {
  pass: passDe,
  fail: failDe,
  proceed: selectDe,
};

export const TrainGermanContainer =
  connect(mapStateToProps, mapDispatchToProps)(TrainGerman);