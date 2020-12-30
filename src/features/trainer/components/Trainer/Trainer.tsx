import React from 'react';
import { TrainingMode } from '../../model/trainingMode';
import { TrainingUnit } from '../../model/trainingUnit';
import { FarsiTrainer } from '../LangTrainer/FarsiTrainer';
import { GermanTrainer } from '../LangTrainer/GermanTrainer';
import { NoTraining } from '../NoTraining/NoTraining';

export class Trainer extends React.Component<{
  unit: TrainingUnit | null;
  trainingMode: TrainingMode;
  fail: () => void;
  next: (trainingMode: TrainingMode) => void;
  pass: () => void;
}> {
  componentDidMount(): void {
    this.selectNextUnit();
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <h2>
          {this.props.trainingMode === TrainingMode.Learning ? 'Training' : 'Wiederholung'}
        </h2>
        {this.renderBody()}
      </React.Fragment>
    );
  }

  renderBody(): JSX.Element {
    const { unit, fail, pass } = this.props;
    if (unit?.trainer === 'de' || unit?.trainer === 'deConj') {
      return <GermanTrainer
        unit={unit}
        pass={pass}
        fail={fail}
        next={(): void => this.selectNextUnit()}
      ></GermanTrainer>;
    } else if (unit?.trainer === 'fa' || unit?.trainer === 'faConj') {
      return <FarsiTrainer
        unit={unit}
        pass={pass}
        fail={fail}
        next={(): void => this.selectNextUnit()}
      ></FarsiTrainer>;
    } else {
      return <NoTraining
        next={(): void => this.selectNextUnit()}
      ></NoTraining>;
    }
  }

  private selectNextUnit(): void {
    this.props.next(this.props.trainingMode);
  }
}
