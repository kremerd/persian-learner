import { format } from 'date-fns';
import React from 'react';
import { FileEarmarkArrowDown } from '../../../../components/Icons';
import { downloadFile } from '../../../../util/file';
import './Settings.scss';

export class Settings extends React.Component {
  render(): JSX.Element {
    return (
      <React.Fragment>
        <h2>Einstellungen</h2>
        <div className="settings">
          <button className="btn btn-link"
            title="Datenbank speichern"
            onClick={(): void => this.exportDatabase()}
          >
            <FileEarmarkArrowDown></FileEarmarkArrowDown>
          </button>
        </div>
      </React.Fragment>
    );
  }

  private exportDatabase(): void {
    const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm');
    const database = JSON.stringify(localStorage);
    downloadFile(`persian-learner-backup-${timestamp}.json`, database);
  }
}
