function validateStringLength(string, maxLength, inputName, label) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  if (string.length > maxLength) {
    $(helper).text(`${label} får inte överskrida ${maxLength} tecken.`);
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

function validateEmail(string, inputName) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;
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

function validatePersonalNumber(string, inputName, isOnBlur) {
  const helper = `#${inputName}Helper`;
  const formGroup = `#${inputName}Group`;

  let valid = false;

  if (string.length <= 6 && !isNaN(string)) {
    valid = true;
  }

  if (string.length === 7 && string.slice(-1) === '-') {
    valid = true;
  }

  if (string.length > 7 && !isNaN(string.slice(-1)) && string.length < 12) {
    valid = true;
  }

  if (isOnBlur) {
    if (string.length !== 11) {
      valid = false;
    }
  }

  if (valid) {
    $(formGroup).removeClass('has-danger');
    $(formGroup).addClass('has-success');
    $(helper).text('');
  } else {
    $(helper).text('Personnummer har fel format.');
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  }

  return valid;
}