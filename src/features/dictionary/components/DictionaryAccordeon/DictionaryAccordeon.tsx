import React from 'react';
import AnimateHeight from 'react-animate-height';
import { ChevronDown } from '../../../../components/Icons';
import { DictionaryEntry } from '../../model/dictionaryEntry';
import { VisibilityState } from '../../model/visibilityState';
import { DictionaryDetails } from '../DictionaryDetails/DictionaryDetails';
import './DictionaryAccordeon.scss';

export class DictionaryAccordeon extends React.Component<{
  entry: DictionaryEntry;
}, {
  details: VisibilityState;
}> {
  state = {
    details: VisibilityState.Hidden,
  };

  render(): JSX.Element {
    const { entry } = this.props;
    return (
      <React.Fragment>
        {this.renderRow(entry)}
        {this.state.details !== VisibilityState.Hidden && this.renderDetails(entry)}
      </React.Fragment>
    );
  }

  private renderRow(entry: DictionaryEntry): JSX.Element {
    return (
      <tr
        className={`dict-accordeon ${this.state.details === VisibilityState.Visible ? 'show-details' : ''}`}
        onClick={(): void => this.toggleDetails()}
      >
        <td>{entry.fa}</td>
        <td>{entry.de}</td>
        <td><ChevronDown></ChevronDown></td>
      </tr>
    );
  }

  private renderDetails(entry: DictionaryEntry): JSX.Element {
    return (
      <tr
        className="dict-accordeon-details"
      >
        <td colSpan={3}>
          <AnimateHeight
            height={(this.state.details === VisibilityState.Visible) ? 'auto' : 0}
            duration={250}
            easing="ease-out"
            onAnimationEnd={(): void => this.endAnimation()}
          >
            <DictionaryDetails entry={entry}></DictionaryDetails>
          </AnimateHeight>
        </td>
      </tr>
    );
  }

  private toggleDetails(): void {
    switch (this.state.details) {
    case VisibilityState.Visible:
      return this.hideDetails();
    case VisibilityState.Hidden:
      return this.showDetails();
    }
  }

  private hideDetails(): void {
    this.setState({ details: VisibilityState.Transitioning });
  }

  private showDetails(): void {
    this.setState({ details: VisibilityState.Transitioning });
    setTimeout(() => this.setState({ details: VisibilityState.Visible }));
  }

  private endAnimation(): void {
    if (this.state.details === VisibilityState.Transitioning) {
      this.setState({ details: VisibilityState.Hidden });
    }
  }
}
