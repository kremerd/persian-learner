import { connect } from 'react-redux';
import { selectCurrentLangProgress, selectCurrentLanguage, selectCurrentLearningUnit } from '../../selectors';
import { fail, pass, select } from '../../slice';
import { Trainer } from './Trainer';

const mapStateToProps = (state: any): any => ({
  lang: selectCurrentLanguage(state),
  progress: selectCurrentLangProgress(state),
  unit: selectCurrentLearningUnit(state),
});

const mapDispatchToProps = {
  fail: fail,
  next: select,
  pass: pass,
};

export const TrainerContainer =
  connect(mapStateToProps, mapDispatchToProps)(Trainer);
