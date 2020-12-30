import { connect } from 'react-redux';
import { selectFilter, selectFilteredDictionary } from '../../selectors';
import { searchDictionary } from '../../slice';
import { Dictionary } from './Dictionary';

const mapStateToProps = (state: any): any => ({
  entries: selectFilteredDictionary(state),
  filter: selectFilter(state),
});

const mapDispatchToProps = {
  search: searchDictionary,
};

export const DictionaryContainer =
  connect(mapStateToProps, mapDispatchToProps)(Dictionary);
