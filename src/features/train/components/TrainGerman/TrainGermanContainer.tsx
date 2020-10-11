import { connect } from 'react-redux';
import { selectFirstLearningUnit } from '../../selectors';
import { failDe, passDe } from '../../slice';
import { TrainGerman } from './TrainGerman';

const mapStateToProps = (state: any): any => ({
  unit: selectFirstLearningUnit(state)
});

const mapDispatchToProps = {
  fail: failDe,
  pass: passDe
};

export const TrainGermanContainer =
  connect(mapStateToProps, mapDispatchToProps)(TrainGerman);