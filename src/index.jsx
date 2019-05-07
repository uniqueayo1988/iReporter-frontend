import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LandingPage from './views/LandingPage';
import ProfilePage from './views/ProfilePage';
import AdminPage from './views/AdminPage';
import CreatePage from './views/CreatePage';
import EditPage from './views/EditPage';
import UserRecordPage from './views/UserRecordPage';
import AdminRecordPage from './views/AdminRecordPage';
import DraftPage from './views/DraftPage';
import reducers from './reducer';

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
        <Route exact path="/record" component={UserRecordPage} />
        <Route exact path="/draft" component={DraftPage} />
        <Route exact path="/edit" component={EditPage} />
        <Route exact path="/admin/record" component={AdminRecordPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
