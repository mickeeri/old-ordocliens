function _fetch(url, options) {
  return fetch(url, options)
    .then(response=> {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        console.log('Ett problem uppstod. Status: ' + response.status);
        return;
      }
    })
    .catch(err=> {
      console.log('Ett problem uppstod: ' + err);
    });
}

function makeGetRequest(url) {
  var options = {
    headers: {
      Accept:         'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  return _fetch(url, options);
}

function makePostRequest(url, payload) {
  var options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'X-CSRF-Token':  document.getElementsByName('csrf-token')[0].content,
      Accept:         'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  return _fetch(url, options);
}

function makePutRequest(url, payload) {
  var options = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'X-CSRF-Token':  document.getElementsByName('csrf-token')[0].content,
      Accept:         'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  return _fetch(url, options);
}

function deleteRequest(url) {
  var options = {
    method:'DELETE',
    headers: {
      'X-CSRF-Token':  document.getElementsByName('csrf-token')[0].content,
      Accept:       'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  return _fetch(url, options);
}
