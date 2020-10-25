import { connect } from 'react-redux';
import { selectCurrentLanguage, selectCurrentLearningUnit, selectCurrentTrainingProgress } from '../../selectors';
import { failDe, passDe, selectDe } from '../../slice';
import { Trainer } from './Trainer';

const mapStateToProps = (state: any): any => ({
  lang: selectCurrentLanguage(state),
  progress: selectCurrentTrainingProgress(state),
  unit: selectCurrentLearningUnit(state),
});

const mapDispatchToProps = {
  fail: failDe,
  next: selectDe,
  pass: passDe,
};

export const TrainerContainer =
  connect(mapStateToProps, mapDispatchToProps)(Trainer);