import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import './App.css';
import Details from './pages/details';
import Lauchpad from './pages/lauchpad';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Lauchpad} />
          <Route path='/details' component={Details} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;