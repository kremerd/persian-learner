import React from 'react';
import { LearningUnitType } from '../../../lexicon/model/learningUnit';
import { ScoreBadge } from '../../../trainer/components/ScoreBadge/ScoreBadge';
import { DictionaryEntry } from '../../model/dictionaryEntry';
import './DictionaryDetails.scss';

export class DictionaryDetails extends React.Component<{
  entry: DictionaryEntry;
}> {
  render(): JSX.Element {
    const { entry } = this.props;
    return (
      <div className="dict-details">
        <div className="row type">
          <div className="key">
            Wortart
          </div>
          <div className="value">
            {this.formatType(entry.type)}
          </div>
        </div>
        <div className="row fa">
          <div className="key">
            Persisch
          </div>
          <div className="value">
            {entry.fa}
            {entry.scoreFa !== null && (
              <span className="score">
                <ScoreBadge score={entry.scoreFa}></ScoreBadge>
              </span>
            )}
          </div>
        </div>
        <div className="row fa-rm">
          <div className="key">
          </div>
          <div className="value">
            /{entry.faRm}/
          </div>
        </div>
        <div className="row de">
          <div className="key">
            Deutsch
          </div>
          <div className="value">
            {entry.de}
            {entry.scoreDe !== null && (
              <span className="score">
                <ScoreBadge score={entry.scoreDe}></ScoreBadge>
              </span>
            )}
          </div>
        </div>
        <div className="row en">
          <div className="key">
            Englisch
          </div>
          <div className="value">
            {entry.en}
          </div>
        </div>
      </div>
    );
  }

  private formatType(type: LearningUnitType): string {
    switch (type) {
    case 'adjective':
      return 'Adjektiv';
    case 'noun':
      return 'Substantiv';
    case 'verb':
      return 'Verb';
    default:
      return 'nicht klassifizert';
    }
  }
}
