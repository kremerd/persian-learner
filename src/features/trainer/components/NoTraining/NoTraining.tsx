import React, { FormEvent } from 'react';
import { HourglassSplit } from '../../../../components/Icons';
import './NoTraining.scss';

export const NoTraining = (props: {
  next: () => void;
}): JSX.Element => (
  <form onSubmit={(e: FormEvent): void => { e.preventDefault(); props.next(); }}>
    <div className="no-training">
      <HourglassSplit></HourglassSplit>
      <p>Zur Zeit gibt es nichts zu üben.</p>
      <button type="submit" className="btn btn-primary">
        Aktualisieren
      </button>
    </div>
  </form>
);
