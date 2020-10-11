import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Header } from './common/components/Header/Header';
import { trainer } from './trainer/routes/trainer';

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <BrowserRouter>
        <header>
          <Header></Header>
        </header>
        <main className="container">
          { trainer }
        </main>
      </BrowserRouter>
    );
  }
}
