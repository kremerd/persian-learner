import React from 'react';
import { DictionaryEntry } from '../../model/dictionaryEntry';

export class DictionaryAccordeon extends React.Component<{
  entry: DictionaryEntry;
}> {
  render(): JSX.Element {
    const { entry } = this.props;
    return (
      <p>
        {entry.de} ({entry.scoreDe}): {entry.fa} ({entry.scoreFa})
      </p>
    );
  }
}
