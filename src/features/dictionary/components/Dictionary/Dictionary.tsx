import React from 'react';
import { DictionaryEntry } from '../../model/dictionaryEntry';
import { DictionaryFilter } from '../../model/dictionaryFilter';
import { DictionaryAccordeon } from '../DictionaryAccordeon/DictionaryAccordeon';

export class Dictionary extends React.Component<{
  entries: DictionaryEntry[];
  filter: Partial<DictionaryFilter>;
  search: (searchTerm: string | null) => void;
}> {
  private searchRef = React.createRef<HTMLInputElement>();

  render(): JSX.Element {
    const { entries } = this.props;
    return (
      <div>
        <h2>Wörterbuch</h2>
        <input className="form-control"
          type="text"
          placeholder="Search dictionary..."
          ref={this.searchRef}
          value={this.props.filter?.searchTerm ?? ''}
          onChange={(): void => this.updateSearchTerm()}
        />
        <table className="table dictionary">
          <tbody>
            {entries.map(e => (<DictionaryAccordeon key={e.id} entry={e}></DictionaryAccordeon>))}
          </tbody>
        </table>
      </div>
    );
  }

  private updateSearchTerm(): void {
    const searchTerm = this.searchRef.current?.value ?? null;
    this.props.search(searchTerm);
  }
}
