import { connect } from 'react-redux';
import { selectDictionary, selectFilter } from '../../selectors';
import { searchDictionary } from '../../slice';
import { Dictionary } from './Dictionary';

const mapStateToProps = (state: any): any => ({
  entries: selectDictionary(state),
  filter: selectFilter(state),
});

const mapDispatchToProps = {
  search: searchDictionary,
};

export const DictionaryContainer =
  connect(mapStateToProps, mapDispatchToProps)(Dictionary);
