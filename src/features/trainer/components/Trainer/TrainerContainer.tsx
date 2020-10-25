import { connect } from 'react-redux';
import { selectCurrentLanguage, selectCurrentLearningUnit, selectCurrentTrainingProgress } from '../../selectors';
import { fail, pass, select } from '../../slice';
import { Trainer } from './Trainer';

const mapStateToProps = (state: any): any => ({
  lang: selectCurrentLanguage(state),
  progress: selectCurrentTrainingProgress(state),
  unit: selectCurrentLearningUnit(state),
});

const mapDispatchToProps = {
  fail: fail,
  next: select,
  pass: pass,
};

export const TrainerContainer =
  connect(mapStateToProps, mapDispatchToProps)(Trainer);