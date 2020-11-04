import React from 'react';
import { X } from '../../../../components/Icons';
import './DictionarySearch.scss';

export class DictionarySearch extends React.Component<{
  currentSearch?: string;
  search: (searchTerm: string | null) => void;
}> {
  private searchRef = React.createRef<HTMLInputElement>();

  render(): JSX.Element {
    return (
      <div className="dict-search">
        <input className={`form-control ${this.props.currentSearch ? '' : 'empty'}`}
          type="text"
          placeholder="Durchsuchen..."
          ref={this.searchRef}
          value={this.props.currentSearch ?? ''}
          onChange={(): void => this.updateSearchTerm()}
        />
        <button className="btn bg-transparent"
          onClick={(): void => this.resetSearchTerm()}
        >
          <X></X>
        </button>
      </div>
    );
  }

  private updateSearchTerm(): void {
    const searchTerm = this.searchRef.current?.value ?? null;
    this.props.search(searchTerm);
  }

  private resetSearchTerm(): void {
    this.props.search(null);
  }
}
