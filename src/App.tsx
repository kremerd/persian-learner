import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { trainer } from './trainer/routes/trainer';

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <div className="container">
        <BrowserRouter>
          { trainer }
        </BrowserRouter>
      </div>
    );
  }
}
