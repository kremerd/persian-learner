import React from 'react';
import { Dash, Plus } from '../../../../components/Icons';

export class ToggleText extends React.Component<{
  title: string;
  value: string;
}, {
  expanded: boolean;
}> {
  state = {
    expanded: false,
  };

  render(): JSX.Element {
    const { title, value } = this.props;
    if (this.state.expanded) {
      return (
        <div className="cursor-pointer"
          onClick={(): void => this.setState({ expanded: false })}
        >
          <Dash></Dash> {title}: <em>{value}</em>
        </div>
      );
    } else {
      return (
        <div className="cursor-pointer"
          onClick={(): void => this.setState({ expanded: true })}
        >
          <Plus></Plus> {title}
        </div>
      );
    }
  }
}
