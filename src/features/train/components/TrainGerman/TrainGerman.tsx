import React from 'react';
import { LearningUnit } from '../../model/learning-unit';

export class TrainGerman extends React.Component<{ unit: LearningUnit }> {
  render(): JSX.Element {
    const { unit } = this.props;
    return (
      <form>
        <h2>Deutsch trainieren</h2>
        <div className="mb-3">
          <label htmlFor="phonetic-persian">
            Persisch (phonetisch)
          </label>
          <input type="text"
            id="phonetic-persian"
            className="form-control-plaintext"
            readOnly
            value={ unit.faPh }>
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
            value={ unit.fa }>
          </input>
        </div>
        <div className="mb-3">
          <label htmlFor="german">Deutsch</label>
          <input type="text"
            id="german"
            className="form-control">
          </input>
        </div>
        <button type="submit"
          className="btn btn-primary btn-block">
          Überprüfen
        </button>
      </form>
    );
  }
}