import { Collapse } from 'bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
  private collapseRef = React.createRef<HTMLDivElement>();
  private collapse?: Collapse;

  componentDidMount(): void {
    if (this.collapseRef.current) {
      this.collapse = new Collapse(this.collapseRef.current, {
        toggle: false
      });
    }
  }

  render(): JSX.Element {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-2">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            Persian Learner
          </span>
          <button type="button"
            className="navbar-toggler"
            onClick={(): void => this.collapse?.toggle()}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            id="navbar-content"
            className="collapse navbar-collapse"
            ref={this.collapseRef}
          >
            <ul className="navbar-nav mr-auto mb-0">
              <li className="nav-item">
                <Link className="nav-link"
                  to="/trainer/german"
                  onClick={(): void => this.collapse?.hide()}
                >
                  Deutsch trainieren
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"
                  to="/trainer/persian"
                  onClick={(): void => this.collapse?.hide()}
                >
                  Persisch trainieren
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}