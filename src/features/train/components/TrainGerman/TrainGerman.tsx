import React from 'react';
import { LearningUnit } from '../../model/learningUnit';

export class TrainGerman extends React.Component<{
  unit: LearningUnit;
  pass: () => void;
  fail: () => void;
  proceed: () => void;
},
{
  enteredTranslation: string;
  resultReported: boolean;
  solved: boolean;
}> {
  state = {
    enteredTranslation: '',
    resultReported: false,
    solved: false,
  };

  private submit(event: React.FormEvent): void {
    event.preventDefault();
    if (this.state.solved) {
      this.proceed();
    } else {
      this.check();
    }
  }

  private proceed(): void {
    this.props.proceed();
    this.setState({
      enteredTranslation: '',
      resultReported: false,
      solved: false,
    });
  }

  private check(): void {
    const pass = this.state.enteredTranslation === this.props.unit.de;
    this.setState({ solved: pass });
    this.reportResult(pass);
  }

  private solve(): void {
    this.setState({ solved: true });
    this.reportResult(false);
  }

  private reportResult(pass: boolean): void {
    if (this.state.resultReported) {
      return;
    } else if (pass) {
      this.props.pass();
    } else {
      this.props.fail();
    }
    this.setState({ resultReported: true });
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
          <input type="text"
            id="phonetic-persian"
            className="form-control-plaintext"
            readOnly
            value={unit.faPh}>
          </input>
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
            className={this.state.solved ? 'form-control-plaintext' : 'form-control'}
            readOnly={this.state.solved}
            value={this.state.enteredTranslation}
            onChange={(e): void => this.setState({ enteredTranslation: e.target.value })}
          >
          </input>
        </div>
        <div className="row">
          {this.renderButtons()}
        </div>
      </form>
    );
  }

  private renderButtons(): JSX.Element {
    if (this.state.solved) {
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
        </React.Fragment>
      );
    }
  }
}