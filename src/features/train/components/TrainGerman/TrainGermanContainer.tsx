import { connect } from 'react-redux';
import { selectedDe } from '../../selectors';
import { failDe, passDe, selectDe } from '../../slice';
import { TrainGerman } from './TrainGerman';

const mapStateToProps = (state: any): any => ({
  unit: selectedDe(state) // TODO: selection can be null
});

const mapDispatchToProps = {
  pass: passDe,
  fail: failDe,
  proceed: selectDe,
};

export const TrainGermanContainer =
  connect(mapStateToProps, mapDispatchToProps)(TrainGerman);