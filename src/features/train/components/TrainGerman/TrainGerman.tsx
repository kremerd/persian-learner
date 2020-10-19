import React from 'react';
import { LearningUnit } from '../../model/learningUnit';
import { TestStage } from '../../model/testStage';
import { ToggleText } from '../ToggleText/ToggleText';

export class TrainGerman extends React.Component<{
  unit: LearningUnit;
  pass: () => void;
  fail: () => void;
  proceed: () => void;
},
{
  enteredTranslation: string;
  stage: TestStage;
}> {
  state = {
    enteredTranslation: '',
    stage: TestStage.Initial,
  };

  private submit(event: React.FormEvent): void {
    event.preventDefault();
    if (this.isShowSolution()) {
      this.proceed();
    } else {
      this.check();
    }
  }

  private proceed(): void {
    this.props.proceed();
    this.setState({
      enteredTranslation: '',
      stage: TestStage.Initial,
    });
  }

  private check(): void {
    const pass = this.state.enteredTranslation === this.props.unit.de;
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
    const { unit } = this.props;
    return (
      <form onSubmit={(e): void => this.submit(e)}>
        <h2>Deutsch trainieren</h2>
        <div className="mb-3">
          <div>
            Fortschritt
          </div>
          <div className={'form-control-plaintext'
              + (this.isCountingAsFailure() ? ' text-danger' : '')
              + (this.isCountingAsSuccess() ? ' text-success' : '')
          }>
            {unit.progress.scoreDe}
          </div>
        </div>
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
        {this.isShowSolution() ? (
          <React.Fragment>
            <div className="mb-3">
              <div>Deutsch</div>
              <div className="form-control-plaintext">
                {this.isCountingAsFailure()
                  ? (
                    <React.Fragment>
                      <span className="text-danger text-decoration-line-through">
                        {this.state.enteredTranslation}
                      </span>
                      <span> </span>
                    </React.Fragment>
                  ) : null
                }
                <span className="text-success">
                  {unit.de}
                </span>
              </div>
              <div className="form-text">
                <ToggleText title="Englisch" value={unit.en}></ToggleText>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="mb-3">
            <label htmlFor="german">
              Deutsch
            </label>
            <input type="text"
              id="german"
              className="form-control"
              value={this.state.enteredTranslation}
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
                className="btn btn-primary btn-block"
                key="chck-btn"
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
      TestStage.Failed
    ].includes(this.state.stage);
  }

  private isCountingAsFailure(): boolean {
    return [
      TestStage.PassedOnRetry,
      TestStage.Retry,
      TestStage.Failed
    ].includes(this.state.stage);
  }

  private isCountingAsSuccess(): boolean {
    return [
      TestStage.Passed
    ].includes(this.state.stage);
  }
}