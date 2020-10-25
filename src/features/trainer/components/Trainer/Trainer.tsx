import React from 'react';
import { LearningUnit } from '../../../lexicon/model/learningUnit';
import { LangProgress } from '../../model/trainingProgress';
import { TrainingUnitLang } from '../../model/trainingUnit';
import { FarsiTrainer } from '../LangTrainer/FarsiTrainer';
import { GermanTrainer } from '../LangTrainer/GermanTrainer';
import { NoTraining } from '../NoTraining/NoTraining';

export class Trainer extends React.Component<{
  lang: TrainingUnitLang | null;
  progress: LangProgress;
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
    } else if (lang === 'fa' && unit !== null) {
      return <FarsiTrainer
        unit={unit}
        progress={progress}
        pass={pass}
        fail={fail}
        next={next}
      ></FarsiTrainer>;
    } else {
      return <NoTraining
        next={this.props.next}
      ></NoTraining>;
    }
  }
}
