import React from 'react';
import { conjugateDe } from '../../../grammar/de/conjugation';
import { conjugateFa } from '../../../grammar/fa/conjugation';
import { conjugateFaRm } from '../../../grammar/faRm/conjugation';
import { SpecificTense } from '../../../grammar/model/verbForm';
import { Word, WordType } from '../../../lexicon/model/word';
import { normalizeDe, normalizeEn, normalizeFa, normalizeFaRm } from '../../../lexicon/util';
import { ScoreBadge } from '../../../trainer/components/ScoreBadge/ScoreBadge';
import { DictionaryConjugationDetails } from '../../model/dictionaryConjugationDetails';
import { DictionaryEntry, DictionaryScore } from '../../model/dictionaryEntry';
import './DictionaryDetails.scss';

export class DictionaryDetails extends React.Component<{
  entry: DictionaryEntry;
}> {
  render(): JSX.Element {
    const { entry } = this.props;
    return (
      <div className="dict-details">
        {this.renderMasterData(entry.word, entry.score)}
        {this.renderConjugation(entry.word, entry.score)}
      </div>
    );
  }

  private renderMasterData(word: Word, score: DictionaryScore): JSX.Element {
    return (
      <React.Fragment>
        <div className="row">
          <div className="key">
            Wortart
          </div>
          <div className="value">
            {this.formatType(word.type)}
          </div>
        </div>
        <div className="row fa-main">
          <div className="key">
            Persisch
          </div>
          <div className="value">
            <p className="text-rtl">
              {normalizeFa(word)}
              {this.renderOptionalBadge(score.fa, 'score-left')}
            </p>
            <p className="fa-rm">
              /{normalizeFaRm(word)}/
            </p>
          </div>
        </div>
        <div className="row">
          <div className="key">
            Deutsch
          </div>
          <div className="value">
            {normalizeDe(word)}
            {this.renderOptionalBadge(score.de, 'score-right')}
          </div>
        </div>
        <div className="row">
          <div className="key">
            Englisch
          </div>
          <div className="value">
            {normalizeEn(word)}
          </div>
        </div>
      </React.Fragment>
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

  private renderConjugation(word: Word, score: DictionaryScore): JSX.Element | undefined {
    if (word.type !== 'verb') {
      return undefined;
    }

    const conjugationDetails = this.computeConjugationDetails(word);

    return (
      <React.Fragment>
        <div className="conj-header">
          <div className="key">
            Konjugation
          </div>
          {(score.faConj || score.deConj) && (
            <div className="value">
              {score.faConj ? this.renderOptionalBadge(score.faConj) : ' – '}
              /
              {score.deConj ? this.renderOptionalBadge(score.deConj) : ' – '}
            </div>
          )}
        </div>
        {conjugationDetails.map(details => this.renderConjugationDetails(details))}
      </React.Fragment>
    );
  }

  private computeConjugationDetails(word: Word): DictionaryConjugationDetails[] {
    return ['1s', '2s', '3s', '1p', '2p', '3p']
      .map(person => ({ person, tense: 'present' }) as SpecificTense)
      .map(form => ({
        person: form.person,
        de: conjugateDe(word.de, form),
        fa: conjugateFa(word.fa, form),
        faRm: conjugateFaRm(word.faRm, form),
      }));
  }

  private renderOptionalBadge(score: number | undefined, className?: string): JSX.Element | undefined {
    if (score === undefined) {
      return undefined;
    } else if (className === undefined) {
      return <ScoreBadge score={score}></ScoreBadge>;
    } else {
      return (
        <span className={className}>
          <ScoreBadge score={score}></ScoreBadge>
        </span>
      );
    }
  }

  private renderConjugationDetails(details: DictionaryConjugationDetails): JSX.Element {
    return (
      <div className="row" key={details.person}>
        <div className="key">
          {details.de}
        </div>
        <div className="value">
          <p className="text-rtl">
            {details.fa}
          </p>
          <p className="fa-rm">
            /{details.faRm}/
          </p>
        </div>
      </div>
    );
  }
}
