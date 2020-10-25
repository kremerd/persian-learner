import React from 'react';
import { LearningUnit } from '../../../lexicon/model/learningUnit';
import { SolutionInputConfig } from '../../model/baseTrainerConfig';
import { ToggleText } from '../ToggleText/ToggleText';
import { BaseTrainer } from './BaseTrainer';

export class GermanTrainer extends BaseTrainer {
  renderTask(unit: LearningUnit): JSX.Element {
    return (
      <div className="mb-3">
        <div>
          Persisch
        </div>
        <div className="form-control-plaintext text-large">
          {unit.fa}
        </div>
        <div className="form-text">
          <ToggleText title="Romanisierung" value={unit.faRm}></ToggleText>
        </div>
      </div>
    );
  }

  renderSolution(unit: LearningUnit, content: JSX.Element): JSX.Element {
    return (
      <div className="mb-3">
        <div>
          Deutsch
        </div>
        <div className="form-control-plaintext">
          {content}
        </div>
        <div className="form-text">
          <ToggleText title="Englisch" value={unit.en}></ToggleText>
        </div>
      </div>
    );
  }

  getSolutionInputConfig(): SolutionInputConfig {
    return {
      label: 'Deutsch',
      large: false,
    };
  }

  getCorrectSolution(): string {
    return this.props.unit.de;
  }
}
