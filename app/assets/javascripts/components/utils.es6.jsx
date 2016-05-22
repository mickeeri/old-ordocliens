
function makePutRequest(url, payload) {
  return $.ajax({
    url,
    dataType: 'json',
    type: 'PUT',
    data: payload,
  });
}

function makePostRequest(url, payload, action) {
  return $.post(url, payload);
}

function makeGetRequest(url) {
  return $.ajax({
    url,
    dataType: 'json',
    cache: false,
  });
}

function makeDeleteRequest(url) {
  return $.ajax({
    url,
    method: 'DELETE',
  });
}

// Showing success or error messages in modal forms.
function showAlertInModal(message, alertId, alertClass, icon) {
  $(alertId).fadeIn();
  $(alertId).addClass(alertClass);
  $(`${alertId}-icon`).addClass(icon);
  $(`${alertId}-span`).text(message);
  if (alertClass === 'alert-success') {
    $('.modal-header').hide();
    $('.modal-body').addClass('no-padding');
  }
}

function showErrorText(message, id) {
  const alert = $(id);
  alert.text(message);
  alert.removeClass('text-success');
  alert.addClass('text-danger');
  alert.slideDown(300);
}

function showSuccessText(message, alertId) {
  // TODO: Could move this to utils.
  const alert = $(alertId);
  alert.text(message);
  alert.removeClass('text-danger');
  alert.addClass('text-success');
  alert.slideDown();
  alert.delay(1000).slideUp(300);
}
