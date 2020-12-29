import React from 'react';
import { WordType } from '../../../lexicon/model/word';
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
        <div className="row">
          <div className="key">
            Wortart
          </div>
          <div className="value">
            {this.formatType(entry.type)}
          </div>
        </div>
        <div className="row fa-main">
          <div className="key">
            Persisch
          </div>
          <div className="value">
            <p>
              {entry.fa}
              {this.renderOptionalBadge(entry.scoreFa)}
            </p>
            <p className="fa-rm">
              /{entry.faRm}/
            </p>
          </div>
        </div>
        <div className="row">
          <div className="key">
            Deutsch
          </div>
          <div className="value">
            {entry.de}
            {this.renderOptionalBadge(entry.scoreDe)}
          </div>
        </div>
        <div className="row">
          <div className="key">
            Englisch
          </div>
          <div className="value">
            {entry.en}
          </div>
        </div>
        {/* {this.renderConjugation()} */}
      </div>
    );
  }

  private formatType(type: WordType): string {
    switch (type) {
    case 'adjective':
      return 'Adjektiv';
    case 'noun':
      return 'Substantiv';
    case 'verb':
      return 'Verb';
    case 'phrase':
      return 'Ausdruck';
    default:
      return 'nicht klassifizert';
    }
  }

  private renderConjugation(): JSX.Element {
    const conjugation = [
      {
        person: '1s',
        de: 'ich habe',
        fa: 'مَن دارَم',
        faRm: 'man dâram',
      },
      {
        person: '2s',
        de: 'du hast',
        fa: 'تو داری',
        faRm: 'to dâri',
      },
      {
        person: '3s',
        de: 'er / sie hat',
        fa: 'او دارَد',
        faRm: 'u dârad',
      },
      {
        person: '1p',
        de: 'wir haben',
        fa: 'ما داریم',
        faRm: 'mâ dârim',
      },
      {
        person: '2p',
        de: 'ihr habt',
        fa: 'شُما دارید',
        faRm: 'shomâ dârid',
      },
      {
        person: '3p',
        de: 'sie haben',
        fa: 'آنها دارَند',
        faRm: 'ânhâ dârand',
      },
    ];
    const scoreFaConj: number | null = 1;
    const scoreDeConj: number | null = 2;

    return (
      <React.Fragment>
        <div className="conj-header">
          <div className="key">
            Konjugation
          </div>
          {(scoreFaConj || scoreDeConj) && (
            <div className="value">
              {scoreFaConj ? this.renderOptionalBadge(scoreFaConj) : ' – '}
              /
              {scoreDeConj ? this.renderOptionalBadge(scoreDeConj) : ' – '}
            </div>
          )}
        </div>
        {
          conjugation.map(conj => (
            <div className="row" key={conj.person}>
              <div className="key">
                {conj.de}
              </div>
              <div className="value">
                <p>
                  {conj.fa}
                </p>
                <p className="fa-rm">
                  /{conj.faRm}/
                </p>
              </div>
            </div>
          ))
        }
      </React.Fragment>
    );
  }

  private renderOptionalBadge(score: number | null): JSX.Element | null {
    if (score === null) {
      return null;
    }

    return (
      <span className="score">
        <ScoreBadge score={score}></ScoreBadge>
      </span>
    );
  }
}
