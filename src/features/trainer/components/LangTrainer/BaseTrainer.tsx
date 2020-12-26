import React from 'react';
import { SolutionInputConfig } from '../../model/baseTrainerConfig';
import { TestStage } from '../../model/testStage';
import { TrainingUnit } from '../../model/trainingUnit';
import { ScoreBadge } from '../ScoreBadge/ScoreBadge';

export abstract class BaseTrainer extends React.Component<{
  unit: TrainingUnit;
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

  render(): JSX.Element {
    const { unit } = this.props;
    return (
      <form onSubmit={(e): void => this.submit(e)}>
        {this.renderTask(unit)}
        {this.isShowSolution()
          ? this.renderSolution(unit, this.renderSolutionContent())
          : this.renderSolutionInput()
        }
        {this.renderButtons()}
      </form>
    );
  }

  protected abstract renderTask(unit: TrainingUnit): JSX.Element;
  protected abstract renderSolution(unit: TrainingUnit, content: JSX.Element): JSX.Element;

  private renderSolutionContent(): JSX.Element {
    const { unit } = this.props;
    return (
      <React.Fragment>
        {this.isWrongSolution() && (
          <React.Fragment>
            <span className="text-danger text-decoration-line-through">
              {this.state.enteredTranslation}
            </span>
            <span> </span>
          </React.Fragment>
        )}
        <span className={this.isCountingAsSuccess() || this.isWrongSolution() ? 'text-success' : 'text-warning'}>
          {this.getCorrectSolution()}
          <ScoreBadge score={unit.score}
            decreased={this.isCountingAsFailure()}
            increased={this.isCountingAsSuccess()}
          ></ScoreBadge>
        </span>
      </React.Fragment>
    );
  }

  private renderSolutionInput(): JSX.Element {
    const { label, large } = this.getSolutionInputConfig();
    return (
      <div className="mb-3">
        <label htmlFor="solution">
          {label}
        </label>
        <input type="text"
          id="solution"
          className={`form-control${large ? ' text-large' : ''}`}
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
    );
  }

  protected abstract getSolutionInputConfig(): SolutionInputConfig;

  private renderButtons(): JSX.Element {
    if (this.isShowSolution()) {
      return (
        <div className="col">
          <button type="submit"
            className="btn btn-primary w-100"
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
                className="btn btn-secondary w-100"
                key="solve-btn"
                onClick={(): void => this.solve()}
              >
                Auflösen
              </button>
            </div>
            <div className="col-6 col-sm-8">
              <button type="submit"
                className={`btn ${this.isCountingAsFailure() ? 'btn-warning' : 'btn-primary'} w-100`}
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
                    className="btn btn-link w-100"
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
    const pass = !this.isWrongSolution();
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

  private isShowSolution(): boolean {
    return [
      TestStage.Passed,
      TestStage.PassedOnRetry,
      TestStage.Failed,
    ].includes(this.state.stage);
  }

  private isWrongSolution(): boolean {
    return this.state.enteredTranslation !== this.getCorrectSolution();
  }

  protected abstract getCorrectSolution(): string;

  private isCountingAsSuccess(): boolean {
    return [
      TestStage.Passed,
    ].includes(this.state.stage);
  }

  private isCountingAsFailure(): boolean {
    return [
      TestStage.PassedOnRetry,
      TestStage.Retry,
      TestStage.Failed,
    ].includes(this.state.stage);
  }
}
