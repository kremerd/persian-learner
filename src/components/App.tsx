import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes from '../routes';
import { Header } from './Header';

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <BrowserRouter basename={process.env.REACT_APP_BASE_HREF}>
        <header>
          <Header></Header>
        </header>
        <main className="container">
          { routes }
        </main>
      </BrowserRouter>
    );
  }
}
