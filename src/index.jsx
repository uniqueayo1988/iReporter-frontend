import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import ProfilePage from './views/ProfilePage';
import AdminPage from './views/AdminPage';
import CreatePage from './views/CreatePage';

// Import styles
import './assets/scss/App.scss';

/**
 * @description App function
 * @returns {JSX} react router
 */
const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/create" component={CreatePage} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
