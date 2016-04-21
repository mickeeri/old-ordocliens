'use strict';

function makePutRequest(url, payload, subToPublish) {
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'PUT',
    data: payload,
    success: function (data) {
      PubSub.publish(subToPublish);
    },

    error: function (xhr) {
      console.error(xhr.responseText, xhr.status, xhr.statusText);
    },
  });
}

function makePostRequest(url, payload) {
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'POST',
    data: payload,
    success: function (data) {
      // Redirect to show page of returned object.
      window.location = url + '/' + data.id;
    },

    error: function (xhr) {
      console.error(xhr.responseText, xhr.status, xhr.statusText);
    },
  });
}

function makeGetRequest(url) {
  return $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
  });
}

function makeDeleteRequest(url) {
  return $.ajax({
    url: url,
    method: 'DELETE',
  });
}
