/* eslint-disable import/prefer-default-export */
// imports
import React, { useState } from 'react';

// local imports
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';

// setting an initial state
const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

function Login() {
  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    isSutbmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin);
  const [login, setLogin] = useState(true);
  return (
    <div>
      <h2 className="mv3">{login ? 'LogIn' : 'Create Account'}</h2>
      <form className="flex flex-column">
        {!login && (
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder="Enter Your Name"
            autoComplete="off"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          className={errors.email && 'error-input'}
          onBlur={handleBlur}
          value={values.email}
          placeholder="Enter Your Email"
          autoComplete="off"
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          name="password"
          className={errors.password && 'error-input'}
          onBlur={handleBlur}
          value={values.password}
          placeholder="Enter Your Password"
          onChange={handleChange}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            onClick={handleSubmit}
            disabled={isSutbmitting}
            style={{ background: isSutbmitting ? 'grey' : 'orange' }}
          >
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
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
