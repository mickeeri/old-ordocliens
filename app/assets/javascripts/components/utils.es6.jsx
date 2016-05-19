
function makePutRequest(url, payload) {
  return $.ajax({
    url,
    dataType: 'json',
    type: 'PUT',
    data: payload,
  });
}

function makePostRequest(url, payload, action) {
  $.post(url, payload, res => {
    if (action === 'redirect') {
      window.location = res.link;
    } else {
      PubSub.publish(action);
    }
  })
  .fail(xhr => {
    console.error(xhr.responseText, xhr.status, xhr.statusText);
  });
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
