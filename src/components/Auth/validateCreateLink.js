export default function validateCreateLink(values) {
  const errors = {};
  // description errors
  if (!values.description) {
    errors.description = 'Description required';
  } else if (values.description.length < 10) {
    errors.description = 'Description must be atleast 10 characters';
  }

  //   url errors
  if (!values.url) {
    errors.url = 'URL required';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = 'Please enter a valid url';
  }

  return errors;
}
