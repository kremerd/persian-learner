import React from 'react';
import { LearningUnit } from '../../../lexicon/model/learningUnit';
import { TrainingMode } from '../../model/trainingMode';
import { LangProgress } from '../../model/trainingProgress';
import { TrainingUnitLang } from '../../model/trainingUnit';
import { FarsiTrainer } from '../LangTrainer/FarsiTrainer';
import { GermanTrainer } from '../LangTrainer/GermanTrainer';
import { NoTraining } from '../NoTraining/NoTraining';

export class Trainer extends React.Component<{
  lang: TrainingUnitLang | null;
  progress: LangProgress;
  unit: LearningUnit | null;
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
    const { lang, progress, unit, fail, pass } = this.props;
    if (lang === 'de' && unit !== null) {
      return <GermanTrainer
        unit={unit}
        progress={progress}
        pass={pass}
        fail={fail}
        next={(): void => this.selectNextUnit()}
      ></GermanTrainer>;
    } else if (lang === 'fa' && unit !== null) {
      return <FarsiTrainer
        unit={unit}
        progress={progress}
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
