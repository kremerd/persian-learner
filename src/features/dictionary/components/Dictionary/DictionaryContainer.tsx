import { connect } from 'react-redux';
import { selectDictionary } from '../../selectors';
import { Dictionary } from './Dictionary';

const mapStateToProps = (state: any): any => ({
  entries: selectDictionary(state),
});

const mapDispatchToProps = {
};

export const DictionaryContainer =
  connect(mapStateToProps, mapDispatchToProps)(Dictionary);
