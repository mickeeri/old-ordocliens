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

function makePostRequest(url, payload, action) {
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'POST',
    data: payload,
    success: function (data) {
      if (action === 'redirect') {
        // Redirect to show page of returned object.
        console.log(data);
        window.location = url + '/' + data.id;
      } else {
        PubSub.publish(action);
      }
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
