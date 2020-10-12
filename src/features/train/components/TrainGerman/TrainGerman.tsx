import React from 'react';
import { LearningUnit } from '../../model/learningUnit';
import { TestStage } from '../../model/testStage';

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
          <label htmlFor="phonetic-persian">
            Persisch (phonetisch)
          </label>
          <div className="row">
            <div className="col-10">
              <input type="text"
                id="phonetic-persian"
                className="form-control-plaintext"
                readOnly
                value={unit.faPh}>
              </input>
            </div>
            <div className="col-2">
              <span className={'form-control-plaintext text-right' + (this.isCountingAsFailure() ? ' text-danger' : '')}>
                {unit.progress.scoreDe}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="persian">
            Persisch
          </label>
          <input type="text"
            id="persian"
            className="form-control-plaintext"
            readOnly
            value={unit.fa}>
          </input>
        </div>
        <div className="mb-3">
          <label htmlFor="german">Deutsch</label>
          <input type="text"
            id="german"
            className={this.renderInputClassNames()}
            readOnly={this.isShowSolution()}
            value={this.state.enteredTranslation}
            onChange={(e): void => this.setState({ enteredTranslation: e.target.value })}
          >
          </input>
        </div>
        {this.isShowSolution() ? (
          <div className="mb-3">
            <label htmlFor="german-solution">Deutsch (korrekt)</label>
            <input type="text"
              id="german-solution"
              className="form-control-plaintext text-success"
              readOnly
              value={unit.de}
            >
            </input>
          </div>
        ) : null}
        <div className="row">
          {this.renderButtons()}
        </div>
      </form>
    );
  }

  private renderInputClassNames(): string {
    switch (this.state.stage) {
    case TestStage.Initial:
      return 'form-control';
    case TestStage.Retry:
      return 'form-control';
    case TestStage.Passed:
      return 'form-control-plaintext text-success';
    case TestStage.PassedOnRetry:
      return 'form-control-plaintext text-success';
    case TestStage.Failed:
      return 'form-control-plaintext text-danger';
    }
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
          {this.state.stage === TestStage.Initial
            ? (
              <div className="col-6 col-sm-4">
                <button type="button"
                  className="btn btn-secondary btn-block"
                  key="skip-btn"
                  onClick={(): void => this.proceed()}
                >
                  Überspringen
                </button>
              </div>
            )
            : (
              <div className="col-6 col-sm-4">
                <button type="button"
                  className="btn btn-secondary btn-block"
                  key="solve-btn"
                  onClick={(): void => this.solve()}
                >
                  Auflösen
                </button>
              </div>
            )
          }
          <div className="col-6 col-sm-8">
            <button type="submit"
              className="btn btn-primary btn-block"
              key="chck-btn"
            >
              Überprüfen
            </button>
          </div>
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
}