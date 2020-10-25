import React from 'react';
import { LearningUnit } from '../../../lexicon/model/learningUnit';
import { TrainingProgress } from '../../model/trainingProgress';
import { TrainingUnitLang } from '../../model/trainingUnit';
import { GermanTrainer } from '../GermanTrainer/GermanTrainer';
import { NoTraining } from '../NoTraining/NoTraining';

export class Trainer extends React.Component<{
  lang: TrainingUnitLang | null;
  progress: TrainingProgress;
  unit: LearningUnit | null;
  fail: () => void;
  next: () => void;
  pass: () => void;
}> {
  componentDidMount(): void {
    this.props.next();
  }

  render(): JSX.Element {
    const { lang, progress, unit, fail, next, pass } = this.props;
    if (lang === 'de' && unit !== null) {
      return <GermanTrainer
        unit={unit}
        progress={progress}
        pass={pass}
        fail={fail}
        next={next}
      ></GermanTrainer>;
    } else {
      return <NoTraining
        next={this.props.next}
      ></NoTraining>;
    }
  }
}
