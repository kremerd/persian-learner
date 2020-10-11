import { connect } from 'react-redux';
import { selectFirstLearningUnit } from '../../selectors';
import { TrainGerman } from './TrainGerman';

const mapStateToProps = (state: any): any => ({
  unit: selectFirstLearningUnit(state)
});

export const TrainGermanContainer = connect(mapStateToProps)(TrainGerman);