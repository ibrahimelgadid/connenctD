const Validator = require('validator');
const isEmpty = require('./is-empty');

validateExperienceInput = (data) => {

    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    


if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
    }

  if (!Validator.isLength(data.title, {min:3, max:30})) {
    errors.title = 'Job title needs to between 3 and 4 characters';
  }



  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }


  if (Validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateExperienceInput;