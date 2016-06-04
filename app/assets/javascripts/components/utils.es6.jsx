function makePutRequest(url, payload) {
  return $.ajax({
    url,
    dataType: 'json',
    type: 'PUT',
    data: payload,
  });
}

function makePostRequest(url, payload) {
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
