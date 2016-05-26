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
      `${label} får inte vara tomt.` :
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

function validateCheckBox(value, inputName) {
  if (!isNaN(value)) {
    const formGroup = `#${inputName}Group`;
    $(formGroup).addClass('has-success');
  }
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

function validatePersonalNumber(string, inputName, isOnBlur) {
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
    if (string === '') {
      $(helper).text('Personnummer får inte vara tomt.');
    } else {
      $(helper).text('Personnummer har fel format.');
    }
    $(formGroup).addClass('has-danger');
    $(formGroup).removeClass('has-success');
  }

  return valid;
}
