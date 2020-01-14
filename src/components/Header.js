/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// imports
import React, { useContext } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

// local imports
import { FirebaseContext } from '../firebase';

function Header() {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="Hook News" className="logo" />
        <NavLink to="/" className="header-title">
          Hook News
        </NavLink>
        <NavLink to="/" className="header-link">
          New
        </NavLink>
        <div className="divider"> | </div>
        <NavLink to="/top" className="header-link">
          Top
        </NavLink>
        <div className="divider"> | </div>
        <NavLink to="/search" className="header-link">
          Search
        </NavLink>
        {user && (
          <>
            {' '}
            <div className="divider"> | </div>
            <NavLink to="/create" className="header-link">
              Submit
            </NavLink>{' '}
          </>
        )}
      </div>
      <div className="flex">
        {user ? (
          <>
            <div className="header-name">{user.displayName}</div>
            <div className="divider"> | </div>
            <div className="header-button" onClick={() => firebase.logout()}>
              {' '}
              logout{' '}
            </div>
          </>
        ) : (
          <NavLink to="/login" className="header-link">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
