const Validator = require('validator');
const isEmpty = require('./is-empty');

validateProfileInput = (data) => {

    let errors = {};

    data.Handle = !isEmpty(data.Handle) ? data.Handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    


if (Validator.isEmpty(data.handle)) {
    errors.handle = 'handle field is required';
    }

  if (Validator.isLength(data.Handle, {min:3, max:30})) {
    errors.Handle = 'Handle needs to between 3 and 4 characters';
  }



  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }


  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  if(!isEmpty(data.website)){
      if(!Validator.isURL(data.website)){
          errors.website = 'Not a valid URL'
      }
  }


  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)){
        errors.youtube = 'Not a valid URL'
    }
}


if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)){
        errors.facebook = 'Not a valid URL'
    }
}


if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)){
        errors.twitter = 'Not a valid URL'
    }
}



  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateProfileInput;