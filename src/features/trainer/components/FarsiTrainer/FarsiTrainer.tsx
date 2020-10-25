import React from 'react';
import { LearningUnit } from '../../../lexicon/model/learningUnit';
import { TestStage } from '../../model/testStage';
import { TrainingProgress } from '../../model/trainingProgress';
import { ScoreBadge } from '../ScoreBadge/ScoreBadge';
import { ToggleText } from '../ToggleText/ToggleText';

export class FarsiTrainer extends React.Component<{
  progress: TrainingProgress;
  unit: LearningUnit;
  fail: () => void;
  next: () => void;
  pass: () => void;
}, {
  enteredTranslation: string;
  stage: TestStage;
}> {
  private inputRef = React.createRef<HTMLInputElement>();
  private submitRef = React.createRef<HTMLButtonElement>();

  state = {
    enteredTranslation: '',
    stage: TestStage.Initial,
  };

  componentDidUpdate(): void {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    } else if (this.submitRef.current) {
      this.submitRef.current.focus();
    }
  }

  private submit(event: React.FormEvent): void {
    event.preventDefault();
    if (this.isShowSolution()) {
      this.proceed();
    } else {
      this.check();
    }
  }

  private proceed(): void {
    this.props.next();
    this.setState({
      enteredTranslation: '',
      stage: TestStage.Initial,
    });
  }

  private check(): void {
    const pass = this.state.enteredTranslation === this.props.unit.fa;
    this.reportResult(pass);
    this.setState({ stage: this.getStageAfterCheck(pass) });
  }

  private getStageAfterCheck(pass: boolean): TestStage {
    if (!pass) {
      return TestStage.Retry;
    } else if (this.state.stage === TestStage.Initial) {
      return TestStage.Passed;
    } else {
      return TestStage.PassedOnRetry;
    }
  }

  private solve(): void {
    this.reportResult(false);
    this.setState({ stage: TestStage.Failed });
  }

  private reportResult(pass: boolean): void {
    if (this.state.stage !== TestStage.Initial) {
      return;
    } else if (pass) {
      this.props.pass();
    } else {
      this.props.fail();
    }
  }

  render(): JSX.Element {
    const { progress, unit } = this.props;
    return (
      <form onSubmit={(e): void => this.submit(e)}>
        <h2>Persisch trainieren</h2>
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
        {this.isShowSolution() ? (
          <div className="mb-3">
            <div>Deutsch</div>
            <div className="form-control-plaintext text-large">
              {this.isWrongSolution() && (
                <React.Fragment>
                  <span className="text-danger text-decoration-line-through">
                    {this.state.enteredTranslation}
                  </span>
                  <span> </span>
                </React.Fragment>
              )}
              <span className={this.isCountingAsSuccess() || this.isWrongSolution() ? 'text-success' : 'text-warning'}>
                {unit.fa}
                <ScoreBadge score={progress.scoreFa}
                  decreased={this.isCountingAsFailure()}
                  increased={this.isCountingAsSuccess()}
                ></ScoreBadge>
              </span>
            </div>
            <div className="form-text">
              <ToggleText title="Romanisierung" value={unit.faRm}></ToggleText>
            </div>
          </div>
        ) : (
          <div className="mb-3">
            <label htmlFor="farsi">
              Persisch
            </label>
            <input type="text"
              id="farsi"
              className="form-control text-large"
              value={this.state.enteredTranslation}
              ref={this.inputRef}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              onChange={(e): void => this.setState({ enteredTranslation: e.target.value })}
            >
            </input>
            <div className="form-text">
              &nbsp;
            </div>
          </div>
        )}
        {this.renderButtons()}
      </form>
    );
  }

  private renderButtons(): JSX.Element {
    if (this.isShowSolution()) {
      return (
        <div className="col">
          <button type="submit"
            className="btn btn-primary btn-block"
            key="proceed-btn"
            ref={this.submitRef}
          >
            Weiter
          </button>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="row mb-2">
            <div className="col-6 col-sm-4">
              <button type="button"
                className="btn btn-secondary btn-block"
                key="solve-btn"
                onClick={(): void => this.solve()}
              >
                Auflösen
              </button>
            </div>
            <div className="col-6 col-sm-8">
              <button type="submit"
                className={`btn btn-block ${this.isCountingAsFailure() ? 'btn-warning' : 'btn-primary'}`}
                key="chck-btn"
                ref={this.submitRef}
              >
                Überprüfen
              </button>
            </div>
          </div>
          {this.state.stage === TestStage.Initial
            ? (
              <div className="row">
                <div className="col">
                  <button type="button"
                    className="btn btn-link btn-block"
                    key="skip-btn"
                    onClick={(): void => this.proceed()}
                  >
                    Überspringen
                  </button>
                </div>
              </div>
            ) : ''
          }
        </React.Fragment>
      );
    }
  }

  private isShowSolution(): boolean {
    return [
      TestStage.Passed,
      TestStage.PassedOnRetry,
      TestStage.Failed,
    ].includes(this.state.stage);
  }

  private isWrongSolution(): boolean {
    return [
      TestStage.Failed,
      TestStage.Retry,
    ].includes(this.state.stage);
  }

  private isCountingAsFailure(): boolean {
    return [
      TestStage.PassedOnRetry,
      TestStage.Retry,
      TestStage.Failed,
    ].includes(this.state.stage);
  }

  private isCountingAsSuccess(): boolean {
    return [
      TestStage.Passed,
    ].includes(this.state.stage);
  }
}
