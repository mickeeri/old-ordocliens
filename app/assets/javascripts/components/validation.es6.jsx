// TODO: Method for adding, removing class to avoid DRY.

function addError(formGroup, helper, message) {
  $(formGroup).addClass('has-danger');
  $(formGroup).removeClass('has-success');
  $(helper).text(message);
}

function addSuccess(formGroup, helper) {
  $(formGroup).removeClass('has-danger');
  $(formGroup).addClass('has-success');
  $(helper).text('');
}


function validateStringLength(string, maxLength, minLength, inputName, label) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  if (minLength === '' && string === '') {
    $(formGroup).removeClass('has-danger');
    $(formGroup).removeClass('has-success');
    $(helper).text('');
    return true;
  }

  if (string.length > maxLength) {
    $(helper).text(`${label} får inte överskrida ${maxLength} tecken.`);
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  } else if (string.length < minLength) {
    const message = minLength === 1 ?
      `${label} måste anges.` :
      `${label} ska bestå av minst ${minLength} tecken.`;
    $(helper).text(message);
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  } else {
    $(formGroup).removeClass('has-danger');
    $(formGroup).addClass('has-success');
    $(helper).text('');
    return true;
  }

  return false;
}

// function validateRequired(string, inputName, label) {
//   const helper = `#${inputName}Helper`;
//   const formGroup = `#${inputName}Group`;
//   if (string.length === 0) {
//     $(helper).text(`${label} får inte vara tomt.`);
//     $(formGroup).addClass('has-danger');
//     $(formGroup).removeClass('has-success');
//   } else {
//     $(formGroup).removeClass('has-danger');
//     $(formGroup).addClass('has-success');
//     $(helper).text('');
//     return true;
//   }
//
//   return false;
// }

/**
 * Validates that select is selected.
 * @param  {string} value     the selected value.
 * @param  {string} inputName id or name of the input element
 * @param  {string} label     label of the input.
 * @return {bool}          true if valid
 */
function validateRequiredSelect(value, inputName, label) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  if (value === '') {
    $(helper).text(`Du måste välja en ${label}.`);
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  } else {
    $(formGroup).removeClass('has-danger');
    $(formGroup).addClass('has-success');
    $(helper).text('');
    return true;
  }

  return false;
}

function validateCheckBox(value, inputName) {
  if (!isNaN(value)) {
    const formGroup = `#${inputName}Group`;
    $(formGroup).addClass('has-success');
    return true;
  }
  return false;
}

function validateEmail(string, inputName, required) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  if (!required && string === '') {
    $(formGroup).removeClass('has-danger');
    $(formGroup).removeClass('has-success');
    $(helper).text('');
    return true;
  }

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!string.match(re)) {
    $(helper).text('E-post har fel format.');
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  } else {
    $(formGroup).removeClass('has-danger');
    $(formGroup).addClass('has-success');
    $(helper).text('');
    return true;
  }

  return false;
}

function validatePostCode(string, inputName, required) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  if (!required && string === '') {
    $(formGroup).removeClass('has-danger');
    $(formGroup).removeClass('has-success');
    $(helper).text('');
    return true;
  }

  const regex = /^([0-9]{5})$/;
  if (!string.match(regex)) {
    $(helper).text('Postnummer har fel format.');
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  } else {
    $(formGroup).removeClass('has-danger');
    $(formGroup).addClass('has-success');
    $(helper).text('');
    return true;
  }

  return false;
}

function validateNumber(value, inputName, label, min, max, steps, required) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  let valid = false;

  // TODO: Better validation.
  if (required && value !== '') {
    addSuccess(formGroup, helper);
    valid = true;

    if (value > max || value <= min) {
      addError(formGroup, helper, `${label} ska vara mellan ${min} och ${max}.`);
      valid = false;
    } else {
      addSuccess(formGroup, helper);
      valid = true;
    }
  } else {
    addError(formGroup, helper, `${label} måste anges.`);
    valid = false;
  }
  return valid;
}

function validatePersonalNumber(string, inputName, onBlur) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  let valid = false;

  // Valides while typing if onChange event.
  if (string.length <= 6 && !isNaN(string)) {
    valid = true;
  }

  if (string.length === 7 && string.slice(-1) === '-') {
    valid = true;
  }

  if (string.length > 7 && !isNaN(string.slice(-1)) && string.length < 12) {
    valid = true;
  }

  // Validate lenght on blur.
  if (onBlur) {
    if (string.length !== 11) {
      valid = false;
    }
  }

  if (valid) {
    $(formGroup).removeClass('has-danger');
    $(formGroup).addClass('has-success');
    $(helper).text('');
  } else {
    if (string === '') {
      $(helper).text('Personnummer måste anges.');
    } else {
      $(helper).text('Personnummer har fel format.');
    }
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  }
  return valid;
}

function validateDate(value, inputName) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;
  if (value !== '') {
    addSuccess(formGroup, helper);
  } else {
    // TODO: Better validation of date.
    addError(formGroup, helper, 'Datum måste anges.');
  }
}
