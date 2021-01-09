import React from 'react';
import { DictionaryEntry } from '../../model/dictionaryEntry';
import { DictionaryFilter } from '../../model/dictionaryFilter';
import { DictionaryAccordeon } from '../DictionaryAccordeon/DictionaryAccordeon';
import { DictionarySearch } from '../DictionarySearch/DictionarySearch';
import './Dictionary.scss';

export class Dictionary extends React.Component<{
  entries: DictionaryEntry[];
  filter: Partial<DictionaryFilter>;
  search: (searchTerm: string | null) => void;
}> {
  render(): JSX.Element {
    const { entries } = this.props;
    return (
      <div className="dictionary">
        <h2>Wörterbuch</h2>
        <DictionarySearch
          currentSearch={this.props.filter?.searchTerm}
          search={(s: string | null): void => this.props.search(s)}
        >
        </DictionarySearch>
        <table className="table">
          <tbody>
            {entries.map(e => (<DictionaryAccordeon key={e.id} entry={e}></DictionaryAccordeon>))}
          </tbody>
        </table>
      </div>
    );
  }
}
