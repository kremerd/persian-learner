import React from 'react';
import { SolutionInputConfig } from '../../model/baseTrainerConfig';
import { TrainingUnit } from '../../model/trainingUnit';
import { ToggleText } from '../ToggleText/ToggleText';
import { BaseTrainer } from './BaseTrainer';

export class FarsiTrainer extends BaseTrainer {
  renderTask(unit: TrainingUnit): JSX.Element {
    return (
      <div className="mb-3">
        <div>
          Deutsch
        </div>
        <div className="form-control-plaintext font-weight-bold">
          {unit.de}
        </div>
        <div className="form-text">
          <ToggleText title="Englisch" value={unit.en}></ToggleText>
        </div>
      </div>
    );
  }

  renderSolution(unit: TrainingUnit, content: JSX.Element): JSX.Element {
    return (
      <div className="mb-3">
        <div>Persisch</div>
        <div className="form-control-plaintext text-large">
          {content}
        </div>
        <div className="form-text">
          <ToggleText title="Romanisierung" value={unit.faRm}></ToggleText>
        </div>
      </div>
    );
  }

  getSolutionInputConfig(): SolutionInputConfig {
    return {
      label: 'Persisch',
      large: true,
    };
  }

  getCorrectSolution(): string {
    return this.props.unit.fa;
  }
}
