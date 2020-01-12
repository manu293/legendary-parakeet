// imports
import React, { useState, useEffect } from 'react';

// local imports

function useFormValidation(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSutbmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSutbmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('User Authenticated');
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    event.persist();
    setValues(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    setValues({ ...initialState });
    console.log({ values });
  }

  return { handleChange, handleSubmit, values, handleBlur, errors, isSutbmitting };
}

export default useFormValidation;
