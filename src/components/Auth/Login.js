/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';

function Login() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? 'LogIn' : 'Create Account'}</h2>
      <form className="flex flex-column">
        {!login && <input type="text" placeholder="Enter Your Name" autoComplete="off" />}
        <input type="email" placeholder="Enter Your Email" autoComplete="off" />
        <input type="password" placeholder="Enter Your Password" />

        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            clasName="button pointer"
            onClick={() => setLogin(prevState => !prevState)}
          >
            {login ? 'Need to create an account ? ' : 'Already have an account?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export { Login };
