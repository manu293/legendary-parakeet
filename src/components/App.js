// imports
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// local imports
import { CreateLink, SearchLinks, LinkList, LinkDetail } from './Link';
import { Login, ForgotPassword } from './Auth';
import Header from './Header';
import useAuth from './Auth/useAuth';
import firebase, { FirebaseContext } from '../firebase';

function App() {
  const user = useAuth();
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/new/1" />} />
              <Route path="/create" component={CreateLink} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/search" component={SearchLinks} />
              <Route path="/top" component={LinkList} />
              <Route path="/new/:page" component={LinkList} />
              <Route path="/link/:linkId" component={LinkDetail} />
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
