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
  $.post(url, payload, res => {
    window.location = Routes.client_path(res.client.id);
  })
  .fail(xhr => {
    console.error(xhr.responseText, xhr.status, xhr.statusText);
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
