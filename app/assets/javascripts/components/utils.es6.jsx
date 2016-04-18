function makePostOrPutRequest (url, method, data) {
  $.ajax({
    url: url,
    dataType: 'json',
    type: method,
    data: data,
    success: function (data) {
      if (method === 'POST') {
        window.location = Routes.client_path(data.client.id);
      } else {
        PubSub.publish('clientUpdated');
      }
    },

    error: function (xhr) {
      console.error(xhr.responseText, xhr.status, xhr.statusText);
    },
  });
}

function makeGetRequest (url) {
  return $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
  });
}
