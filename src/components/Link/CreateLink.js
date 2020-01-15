/* eslint-disable no-use-before-define */
// imports
import React, { useContext } from 'react';

// local imports
import { useFormValidation, validateCreateLink } from '../Auth';
import { FirebaseContext } from '../../firebase';

const INITIAL_STATE = {
  description: '',
  url: '',
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const { handleChange, handleSubmit, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history.push('/login');
    } else {
      const { description, url } = values;
      const newLink = {
        description,
        url,
        portedBy: {
          id: user.uid,
          name: user.displayName,
        },
        votes: [],
        comments: [],
        created: Date.now(),
      };
      firebase.db.collection('links').add(newLink);
      props.history.push('/');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        onChange={handleChange}
        value={values.description}
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        className={errors.description && 'error-input'}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        onChange={handleChange}
        value={values.url}
        placeholder="The URL for the link"
        autoComplete="off"
        type="url"
        className={errors.url && 'error-input'}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        {' '}
        Submit
      </button>
    </form>
  );
}

export { CreateLink };
