/* eslint-disable import/prefer-default-export */
// imports
import React, { useState, useContext } from 'react';

// local imports
import { FirebaseContext } from '../../firebase';

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPass, setResetPass] = useState('');
  const [isPassResErr, setIsPassResErr] = useState(null);
  const [isPassReset, setIsPassReset] = useState(false);
  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPass);
      setIsPassReset(true);
      setIsPassResErr(null);
    } catch (err) {
      console.log('There is an error : ', err);
      setIsPassResErr(err.message);
    }
  }
  return (
    <div>
      <input
        type="email"
        className="input"
        value={resetPass}
        placeholder="Provide your email"
        onChange={e => setResetPass(e.target.value)}
      />
      <div>
        <button type="button" className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPassResErr && <p className="error-text">{isPassResErr}</p>}
      {isPassReset && <p>Check email to reset password</p>}
    </div>
  );
}

export { ForgotPassword };
