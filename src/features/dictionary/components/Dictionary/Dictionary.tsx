import React from 'react';
import { DictionaryEntry } from '../../model/dictionaryEntry';
import { DictionaryAccordeon } from '../DictionaryAccordeon/DictionaryAccordeon';

export class Dictionary extends React.Component<{
  entries: DictionaryEntry[];
}> {
  render(): JSX.Element {
    const { entries } = this.props;
    return (
      <div>
        <h2>Wörterbuch</h2>
        <table className="table dictionary">
          <tbody>
            {entries.map(e => (<DictionaryAccordeon key={e.id} entry={e}></DictionaryAccordeon>))}
          </tbody>
        </table>
      </div>
    );
  }
}
